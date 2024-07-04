import { component$, effect, type ComponentType, type JSX } from "@swwind/ly";
import type { ActionHandler, ActionReturnValue } from "../../server/action.ts";

type FormProps<T extends ActionReturnValue> = Omit<
  JSX.HTMLAttributes<HTMLFormElement>,
  "action" | "onSuccess" | "onError"
> & {
  action: ActionHandler<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};

export const Form = <T extends ActionReturnValue>(props: FormProps<T>) => {
  const { action, onSuccess, onError, ...remains } = props;

  // register callbacks
  effect(() => {
    const state = action.state.value;
    if (state.state === "ok") {
      onSuccess?.(state.data);
    } else if (state.state === "error") {
      onError?.(state.error);
    }
  });

  return (
    <form
      action={"?_action=" + action.ref}
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget, e.submitter);
        action.submit(formData);
      }}
      {...remains}
    />
  );
};

type ActionEffect<T extends ActionReturnValue> = {
  action: ActionHandler<T>;
  success?: (data: T) => void | (() => void);
  error?: (error: Error) => void | (() => void);
};

export function useActionEffect<T extends ActionReturnValue>({
  action,
  success,
  error,
}: ActionEffect<T>) {
  effect(() => {
    const state = action.state.value;
    if (state.state === "ok" && success) {
      return success(state.data);
    } else if (state.state === "error" && error) {
      return error(state.error);
    }
  });
}
