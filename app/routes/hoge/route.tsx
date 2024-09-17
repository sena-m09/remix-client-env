import type { MetaFunction } from "@remix-run/node";
import { 
  useRouteLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import type { loader } from "~/root";

export const meta: MetaFunction = () => {
  return [
    { title: "Hoge Page" },
    { name: "description", content: "Hoge Hoge" },
  ];
};

export default function Hoge() {
  const data = useRouteLoaderData<typeof loader>("root")!;

  if(data.ENV) {
    console.log(data.ENV)
  }
  return (
    <div>
      <h1>hoge</h1>
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
        <p>Hoge</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}