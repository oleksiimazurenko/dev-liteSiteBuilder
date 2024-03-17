import { CardWrapper } from "@/features/main/auth/ui/card-wrapper/card-wrapper";
import { ErrorCard } from "@/features/main/auth/ui/response-status/error-card";

const AuthErrorPage = () => {
  return <ErrorCard CardWrapper={CardWrapper} />;
};

export default AuthErrorPage;
