"use client";

import { useState, useTransition } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React from "react";
import { CardWrapper } from "@/components/auth/cardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormSuccess } from "@/components/auth/form-success";
import { FormError } from "@/components/auth/form-error";
import { login } from "@/actions/login";
import { LoginSchema } from "@/schemas";

// Définir le type pour les valeurs du formulaire
type LoginFormValues = z.infer<typeof LoginSchema>;

// Définir le type pour la réponse de la fonction login
interface LoginResponse {
  error?: string;
  success?: string;
}

export const LoginForm: React.FC = () => {
  
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isSubmitting, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(async () => {
      const data: LoginResponse = await login(values);
      setError(data.error);
      setSuccess(data.success);

      if (data.success) {
        const callbackUrl = '/settings';
        router.push(callbackUrl);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Connectez-vous à votre compte"
      backButtonLabel="Je n'ai pas de compte client chez LCL"
      backButtonHref="/auth/register"
      showSocialLogin
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identifiant</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={isSubmitting}
                      className="transition rounded-full hover:border-2"
                      placeholder="Identifiant LCL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isSubmitting}
                      className="rounded-full hover:border-2"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isSubmitting}
            className="bg-[#232D7E] hover:bg-[#232e7ebb] w-full text-white rounded-full"
            type="submit"
          >
            Sign in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
