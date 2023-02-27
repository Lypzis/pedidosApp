import React, { useState } from "react";
import Dropdown from "./Dropdown";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useForm } from "@inertiajs/react";

dayjs.extend(relativeTime);

export default function Cliente({ cliente }) {
    const [editing, setEditing] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        nome: cliente && cliente.nome ? cliente.nome : "",
        cpf: cliente && cliente.cpf ? cliente.cpf : "",
        data_nasc: cliente && cliente.data_nasc ? cliente.data_nasc : "",
        telefone: cliente && cliente.telefone ? cliente.telefone : "",
        ativo: cliente && cliente.ativo ? cliente.ativo : 0,
    });

    const submit = (event) => {
        event.preventDefault();
        patch(route("clientes.update", cliente.id), {
            onSuccess: () => setEditing(false),
        });
    };

    return (
        <div className="p-6 flex space-x-2">
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-gray-800">
                            Cliente: {cliente.id}
                        </span>
                    </div>

                    <Dropdown>
                        <Dropdown.Trigger>
                            <button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <button
                                className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                onClick={() => setEditing(true)}
                            >
                                Editar
                            </button>
                            <Dropdown.Link
                                as="button"
                                href={route("clientes.destroy", cliente.id)}
                                method="delete"
                            >
                                Deletar
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>

                {editing ? (
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
                                    setData(
                                        "ativo",
                                        event.target.checked ? 1 : 0
                                    )
                                }
                            />
                        </label>
                        <InputError message={errors.message} className="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button
                                className="mt-4"
                                onClick={() => {
                                    setEditing(false);
                                    reset();
                                    clearErrors();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <p className="mt-4 text-lg text-gray-900">
                            Nome: {cliente.nome}
                        </p>
                        <p className="mt-4 text-lg text-gray-900">
                            CPF: {cliente.cpf}
                        </p>
                        <p className="mt-4 text-lg text-gray-900">
                            Data de Nascimento: {cliente.data_nasc}
                        </p>
                        <p className="mt-4 text-lg text-gray-900">
                            Telefone: {cliente.telefone}
                        </p>
                        <p className="mt-4 text-lg text-gray-900">
                            Ativo: {cliente.ativo === 1 ? "ativo" : "inativo"}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
