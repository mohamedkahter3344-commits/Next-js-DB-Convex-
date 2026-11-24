
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
import { loginSchema, typeLoginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useTransition } from "react";

const LoginPage = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter();

  const form = useForm<typeLoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const login = async (values: typeLoginSchema) => {
    try {

      startTransition(async()=>{
        const { data } = await authClient.signIn.email({
          email: values.email,
          password: values.password,
          fetchOptions:{
            onSuccess:()=>{
              toast.add({
                title: "Login Successfully",
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
            }
          }
        });
  
        console.log(data)
      })
      
    } catch (error) {
      toast.add({
        title:
          error instanceof Error
            ? error.message
            : "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to get started right away
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={form.handleSubmit(login)}>
          <FieldGroup >
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

            <Button
              type="submit"
              disabled={isPending}
              className="w-full"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Signing In...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;



/*
{
    "redirect": false,
    "token": "YxMoNjg6DvtsZ0QRWJf4jXtLoY4DlTEF",
    "user": {
        "name": "Mohamed Khater",
        "email": "mohamedkahter3344@gmail.com",
        "emailVerified": false,
        "createdAt": 1795382372142,
        "updatedAt": 1795382372142,
        "id": "jn75g880qhekxmv0npybeg1nq58jqc19"
    }
}

*/ 