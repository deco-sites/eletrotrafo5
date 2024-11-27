import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";
import { useScript } from "@deco/deco/hooks";
const onLoad = (containerID: string) => {
  window.STOREFRONT.USER.subscribe((sdk) => {
    const container = document.getElementById(containerID) as HTMLDivElement;
    const nodes = container.querySelectorAll<HTMLAnchorElement>("a");
    const login = nodes.item(0);
    const account = nodes.item(1);
    const user = sdk.getUser();
    if (user?.email) {
      login.classList.add("hidden");
      account.classList.remove("hidden");
    } else {
      login.classList.remove("hidden");
      account.classList.add("hidden");
    }
  });
};
function SignIn({ variant }: {
  variant: "mobile" | "desktop";
}) {
  const id = useId();
  return (
    <div id={id}>
      <a
        class={clx("p-0 font-thin  no-animation", variant === "mobile" && "")}
        href="/login"
        aria-label="Login"
      >
        <Icon id="account_circle" />
      </a>
      <a
        class={clx(
          "hidden",
          "p-0 font-thin  no-animation",
          variant === "mobile" && "",
        )}
        href="/account"
        aria-label="Account"
      >
        <Icon id="account_circle" />
        {variant === "desktop" && <span>My account</span>}
      </a>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </div>
  );
}
export default SignIn;