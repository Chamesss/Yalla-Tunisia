import { Divider, Input, Textarea } from "@nextui-org/react";
import React from "react";

export default function MainHandMade({ data }: any) {
  return (
    <div className="">
      <h1>General Info</h1>
      <Input placeholder="title" />
      <Input placeholder="price" />
      <Input placeholder="Qte" />
      <Textarea placeholder="Description" />
      <Input placeholder="materials used" />
      <Divider className="my-2" />
      <h1>Pictures</h1>
      <p>pictures</p>
      <Divider className="my-2" />
      <p>sizes</p>
      <Input placeholder="height" />
      <Input placeholder="width" />
      <Divider className="my-2" />
      <h1>Colors section</h1>
      <p>colors</p>
    </div>
  );
}
