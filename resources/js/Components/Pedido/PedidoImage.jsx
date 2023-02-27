import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import InputError from "../InputError";
import PrimaryButton from "../PrimaryButton";

export default function PedidoImagem({
    pedidoImagem,
    pedidoId,
    setAddingImage,
    addingImage,
}) {
    const getPedidoImagem = (id) => {
        const image = pedidoImagem.find((imagem) => imagem.pedido_id === id);

        if (typeof image !== "undefined") return image;

        return null;
    };

    const [existingPedidoImagem, setExistingPedidoImagem] = useState(
        getPedidoImagem(pedidoId)
    );

    const { data, setData, post, patch, clearErrors, reset, errors } = useForm({
        pedido_id: existingPedidoImagem
            ? existingPedidoImagem.pedido_id
            : pedidoId,
        imagem: existingPedidoImagem ? existingPedidoImagem.imagem : "",
        capa: existingPedidoImagem ? existingPedidoImagem.capa : "",
    });

    const submit = (event) => {
        event.preventDefault();
        if (!existingPedidoImagem) {
            post(route("pedido__imagems.store"), {
                onSuccess: () => reset(),
            });
        } else
            patch(route("pedido__imagems.update", existingPedidoImagem.id), {
                onSuccess: () => setAddingImage(false),
            });
        setAddingImage(false);
    };

    const onStatusChange = (event) => {
        setData("pedido__statuses_id", event.target.value);
    };

    const onClienteChange = (event) => {
        setData("cliente_id", event.target.value);
    };

    return (
        <>
            {addingImage ? (
                <form onSubmit={submit}>
                    <label>
                        Imagem:{" "}
                        <input
                            name="imagem"
                            maxLength={255}
                            value={data.imagem}
                            required
                            onChange={(event) =>
                                setData("imagem", event.target.value)
                            }
                        />
                    </label>
                    <label>
                        Capa:{" "}
                        <input
                            name="Capa"
                            maxLength={255}
                            value={data.capa}
                            required
                            onChange={(event) =>
                                setData("capa", event.target.value)
                            }
                        />
                    </label>
                    <InputError message={errors.message} className="mt-2" />
                    <div className="space-x-2">
                        <PrimaryButton className="mt-4">Save</PrimaryButton>
                        <button
                            className="mt-4"
                            onClick={() => {
                                setAddingImage(false);
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
                        Imagem: {data.imagem}
                    </p>
                    <p className="mt-4 text-lg text-gray-900">
                        Capa: $ {data.capa}
                    </p>
                </>
            )}
        </>
    );
}
