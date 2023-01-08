import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createModuleRoutes,
	Outlet,
	RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter(
	createModuleRoutes([
		{
			path: "/",
			module: () => import("./routes/root"),
			children: [
				{
					module: () => import("./routes/root"),
					use: ["ErrorBoundary"],
					children: [
						{ index: true, module: () => import("./routes/index") },
						{
							path: "contacts/:contactId",
							module: () => import("./routes/contact"),
						},
						{
							path: "contacts/:contactId/edit",
							module: () => import("./routes/edit"),
						},
						{
							path: "contacts/:contactId/destroy",
							module: () => import("./routes/destroy"),
						},
					],
				},
			],
		},
	]),
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<React.Suspense fallback={null}>
			<RouterProvider router={router} />
		</React.Suspense>
	</React.StrictMode>,
);
