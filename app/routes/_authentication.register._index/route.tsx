import { Button, Stack } from "@mui/material";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { EmailValidator, MaxLengthValidator, MinLengthValidator, RequiredValidator, useForb } from "forb";
import { FormEvent, useEffect } from "react";
import { InputField } from "~/components/InputField";
import { actionServer } from "./action.server";
import { useClientMessage } from "~/hooks/useClientMessage";

export function action(args: ActionFunctionArgs) {
  return actionServer(args);
}

export default function Page() {
  const forb = useForb();
  const actionData = useActionData();
  const clientMessage = useClientMessage();

  useEffect(() => {
    clientMessage.handle(actionData);
  }, [actionData]);

  function onSubmit(e: FormEvent) {
    if (!forb.validate()) {
      e.preventDefault();
    }
  }

  return (
    <Form method="POST" onSubmit={onSubmit} replace>
      <Stack spacing="16px">
        <InputField
          name="name"
          label="Nama Lengkap"
          forb={forb}
          validators={[
            new RequiredValidator("Field ini tidak boleh kosong"),
            new MaxLengthValidator(50, "Maksimum 50 karakter"),
          ]}
        />

        <InputField
          name="emailAddress"
          label="Alamat Email"
          forb={forb}
          validators={[
            new RequiredValidator("Field ini tidak boleh kosong"),
            new EmailValidator("Alamat email tidak valid"),
            new MaxLengthValidator(100, "Maksimum 100 karakter"),
          ]}
          type="email"
        />
        <InputField
          name="password"
          label="Password"
          forb={forb}
          validators={[
            new RequiredValidator("Field ini tidak boleh kosong"),
            new MinLengthValidator(8, "Minimal 8 karakter"),
          ]}
          type="password"
        />
      </Stack>
      <Button type="submit" fullWidth disableElevation size="large" variant="contained" sx={{ marginTop: "32px" }}>
        Daftar
      </Button>
    </Form>
  );
}
