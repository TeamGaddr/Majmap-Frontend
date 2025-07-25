import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/context/theme/ThemeProvider";

type ContextComponentProps = {
  children: ReactNode;
};
const queryClient = new QueryClient();

export default function ContextComponent({ children }: ContextComponentProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
