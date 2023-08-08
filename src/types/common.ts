export type ComponentProps<T> = {
  className?: string;
  children?: React.ReactNode;
} & T;

export type FComponent<T = Record<string, unknown>, S = unknown> = (
  props: ComponentProps<T>,
  ref: React.Ref<S>
) => JSX.Element;
