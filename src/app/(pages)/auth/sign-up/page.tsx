"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { signUpSchema, typeSignUpSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

const SignUpPage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<typeSignUpSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const signUp = async (values: typeSignUpSchema) => {
    try {
      startTransition(async () => {
        const { data } = await authClient.signUp.email({
          name: values.name,
          email: values.email,
          password: values.password,
          fetchOptions: {
            onSuccess: () => {
              toast.add({
                title: "Account created successfully",
                type: "success",
              });

              router.push("/");
            },
            onError: (ctx) => {
              toast.add({
                title: ctx.error.message || "Invalid email or password",
                type: "error",
              });

              return;
            },
          },
        });

        console.log(data);
      });
    } catch (error) {
      toast.add({
        title: error instanceof Error ? error.message : "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={form.handleSubmit(signUp)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Full Name</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      type="text"
                      placeholder="Enter Full Name"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      type="email"
                      placeholder="Enter Email"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      type="password"
                      placeholder="Enter Password"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
     
    </Card>
  );
};

export default SignUpPage;

/*
{
    "token": "4Jf0pCvomtCR782Fgqoc2uCivwiz4DFp",
    "user": {
        "name": "Ahmed Khater",
        "email": "mohamedkahter334400@gmail.com",
        "emailVerified": false,
        "createdAt": 1795407699552,
        "updatedAt": 1795407699552,
        "id": "jn7crnx94pee0r9661rvhm6xmn8jszyr"
    }
}

*/
