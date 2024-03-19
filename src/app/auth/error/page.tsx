import { CardWrapper, ErrorCard } from "@/features/main/auth";

const AuthErrorPage = () => {
  return (
    <div className="flex min-h-[calc(100svh-59.5px)] items-center justify-center">
      <ErrorCard CardWrapper={CardWrapper} />;
    </div>
  );
};

export default AuthErrorPage;
