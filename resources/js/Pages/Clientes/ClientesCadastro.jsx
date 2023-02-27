import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";

export default function ClientesCadastro({ cliente }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        nome: cliente && cliente.nome ? cliente.nome : "",
        cpf: cliente && cliente.cpf ? cliente.cpf : "",
        data_nasc: cliente && cliente.data_nasc ? cliente.data_nasc : "",
        telefone: cliente && cliente.telefone ? cliente.telefone : "",
        ativo: cliente && cliente.ativo ? cliente.ativo : 0,
    });

    const submit = (event) => {
        event.preventDefault();
        post(route("clientes.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Clientes" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form
                    onSubmit={submit}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <label>
                        Nome:{" "}
                        <input
                            name="nome"
                            maxLength={255}
                            value={data.nome}
                            required
                            onChange={(event) =>
                                setData("nome", event.target.value)
                            }
                        />
                    </label>
                    <label>
                        CPF:{" "}
                        <input
                            name="cpf"
                            maxLength={15}
                            value={data.cpf}
                            required
                            onChange={(event) =>
                                setData("cpf", event.target.value)
                            }
                        />
                    </label>
                    <label>
                        Data de Nascimento:{" "}
                        <input
                            type={"date"}
                            name="data de nascimento"
                            value={data.data_nasc}
                            required
                            onChange={(event) =>
                                setData("data_nasc", event.target.value)
                            }
                        />
                    </label>
                    <label>
                        Telefone:{" "}
                        <input
                            name="telefone"
                            maxLength={15}
                            value={data.telefone}
                            onChange={(event) =>
                                setData("telefone", event.target.value)
                            }
                        />
                    </label>
                    <label>
                        Ativo:{" "}
                        <input
                            type={"checkbox"}
                            name="ativo"
                            checked={data.ativo === 1}
                            required
                            onChange={(event) =>
                                setData("ativo", event.target.checked ? 1 : 0)
                            }
                        />
                    </label>
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton
                        className="mt-4"
                        processing={processing.toString()}
                    >
                        Cadastrar
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
