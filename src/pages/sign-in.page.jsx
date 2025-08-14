import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] lg:px-8 mx-2 md:mx-20 lg:mx-30">
      <SignIn
        signUpUrl="/register"
        forceRedirectUrl={"/user/dashboard"}
        appearance={{
          variables: {
            colorPrimary: "#00c950",
            colorBackground: "#f9f9f9",
            colorText: "#333333",
          },
        }}
      />
    </div>
  );
};

export default SignInPage;
