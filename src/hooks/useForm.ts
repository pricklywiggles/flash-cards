import * as React from 'react';
import { Schema, validate } from 'tiny-validation';
import { useSafeState } from './useSafeState';

type InputTarget = EventTarget & HTMLInputElement;

export interface CustomTarget {
  name: string;
  type?: string;
  value: unknown;
}
type Target = InputTarget | CustomTarget;

export type ChangeEvent = {
  target: {
    name: string;
    type?: string;
    value: unknown;
  };
  persist?: undefined;
};

type FormState<T> = {
  values: T;
  errors: Record<string, string[]>;
  visited: Record<string, boolean>;
  hasErrors: boolean;
};

enum Actions {
  VALUES = 'set_values',
  ERRORS = 'set_errors',
  CHANGE = 'handle_change',
  RESET = 'reset'
}

type Action<T> =
  | { type: Actions.VALUES; payload: T }
  | { type: Actions.ERRORS; payload: Record<string, string[]> }
  | { type: Actions.CHANGE; payload: Target }
  | { type: Actions.RESET; payload: T };

function reducer<T>(state: FormState<T>, action: Action<T>): FormState<T> {
  switch (action.type) {
    case Actions.VALUES:
      return { ...state, values: action.payload };

    case Actions.ERRORS:
      return {
        ...state,
        errors: action.payload,
        hasErrors: Object.keys(action.payload).length !== 0
      };

    case Actions.RESET:
      return {
        values: action.payload,
        errors: {},
        visited: {},
        hasErrors: false
      };

    case Actions.CHANGE: {
      const { name, type, value } = action.payload;
      const newValue =
        type === 'checkbox' ? (action.payload as InputTarget).checked : value;

      return {
        ...state,
        values: { ...state.values, [name]: newValue },
        visited: { ...state.visited, [name]: true }
      };
    }

    default:
      return state;
  }
}

const getFormState = <T>(values: T | (() => T)): FormState<T> => ({
  values: values instanceof Function ? values() : values,
  errors: {},
  visited: {},
  hasErrors: false
});

const setErrors =
  <T>(dispatch: React.Dispatch<Action<T>>) =>
  (value: Record<string, readonly string[]>) =>
    dispatch({
      type: Actions.ERRORS,
      payload: value as Record<string, string[]>
    });

const changeValue = <T>(dispatch: React.Dispatch<Action<T>>, target: Target) =>
  dispatch({ type: Actions.CHANGE, payload: target });

const setValues =
  <T>(dispatch: React.Dispatch<Action<T>>) =>
  (values: T) =>
    dispatch({ type: Actions.VALUES, payload: values });

const initialize = <T>(dispatch: React.Dispatch<Action<T>>, values: T) =>
  dispatch({ type: Actions.RESET, payload: values });

type UseFormProps<T, S> = {
  onSubmit: (formValues: T, ...args: unknown[]) => Promise<S>;
  stableSchema: Schema;
  initialValues: T | (() => T);
  disabledOverride?: boolean;
};

const useForm = <T extends Record<string, unknown>, S = unknown>({
  onSubmit,
  stableSchema,
  initialValues,
  disabledOverride = false
}: UseFormProps<T, S>) => {
  const [state, dispatch] = React.useReducer(
    reducer<T>,
    getFormState(initialValues)
  );
  const [isSubmitting, setIsSubmitting] = useSafeState(false);

  React.useEffect(() => {
    validate(stableSchema, state.values).fold(setErrors(dispatch), () =>
      setErrors(dispatch)({})
    );
  }, [stableSchema, state.values]);

  const handleSubmit = async (
    event?: React.FormEvent<HTMLFormElement>,
    ...args: unknown[]
  ) => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    if (Object.keys(state.errors).length == 0) {
      return onSubmit(state.values, ...args).finally(() => {
        setIsSubmitting(false);
      });
    } else {
      setIsSubmitting(false);
      return null;
    }
  };

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement> | ChangeEvent | Target
  ) => {
    if ('target' in event) {
      event.persist?.();
      changeValue(dispatch, event.target);
    } else {
      changeValue(dispatch, event);
    }
  };

  const reset = (values = initialValues) => {
    setIsSubmitting(false);
    initialize(dispatch, values instanceof Function ? values() : values);
  };

  const isFieldVisited = (fieldName: string) => {
    return state.visited['override'] || state.visited[fieldName];
  };

  const isDisabled = isSubmitting || disabledOverride || state.hasErrors;

  return {
    handleFieldChange,
    handleSubmit,
    isSubmitting,
    isFieldVisited,
    ...state,
    isDisabled,
    setValues: setValues<T>(dispatch),
    setErrors: setErrors<T>(dispatch),
    reset
  };
};

export { useForm };
export * from 'tiny-validation';
