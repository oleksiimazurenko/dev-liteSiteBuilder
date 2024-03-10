import { CardWrapper } from "@/features/auth/ui/card-wrapper/card-wrapper";
import { ErrorCard } from "@/features/auth/ui/response-status/error-card";

const AuthErrorPage = () => {
  return <ErrorCard CardWrapper={CardWrapper} />;
};

export default AuthErrorPage;
