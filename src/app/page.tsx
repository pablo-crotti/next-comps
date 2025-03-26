"use client";
import GridContainer from "@/components/GridContainer";
import Modal from "@/components/Modal";
import { Plus } from "@/components/Icons";
import InputText from "@/components/Forms/InputText";
import Table from "@/components/Table";
import TableRow from "@/components/Table/TableRow";
import TableCell from "@/components/Table/TableCell";
import DynamicBooking from "@/components/DynamicBooking";
import { useState } from "react";

export default function Home() {
  const headerData = [
    {
      name: "Product name",
      key: "product_name",
      sortable: true,
    },
    { name: "Color", key: "color", sortable: true, hiddenOnMobile: true },
    { name: "Category", key: "category", sortable: true, hiddenOnMobile: true },
    { name: "Price", key: "price", sortable: true, default: true },
    { name: "Action", key: "action" },
  ];

  const [tableData, setTableData] = useState([
    {
      product_name: "Apple MacBook Pro 17",
      color: "Silver",
      category: "Laptop",
      price: "2999",
    },
    {
      product_name: "Microsoft Surface Pro",
      color: "White",
      category: "Laptop PC",
      price: "1999",
    },
    {
      product_name: "Magic Mouse 2",
      color: "Black",
      category: "Accessories",
      price: "99",
    },
    {
      product_name: "Google Pixel Phone",
      color: "Gray",
      category: "Phone",
      price: "799",
    },
    {
      product_name: "Apple Watch 5",
      color: "Red",
      category: "Wearables",
      price: "999",
    },
  ]);

  const sortData = (key: string, sortDirection: "asc" | "desc") => {
    if (!tableData[0] || !(key in tableData[0])) {
      return;
    }

    const sortedData = [...tableData].sort((a, b) => {
      const aValue = a[key as keyof typeof a];
      const bValue = b[key as keyof typeof b];

      const aNum = typeof aValue === "number" ? aValue : Number(aValue);
      const bNum = typeof bValue === "number" ? bValue : Number(bValue);

      if (!isNaN(aNum) && !isNaN(bNum)) {
        if (sortDirection === "asc") {
          return aNum - bNum;
        } else if (sortDirection === "desc") {
          return bNum - aNum;
        }
      } else {
        if (sortDirection === "asc") {
          if (aValue < bValue) return -1;
          if (aValue > bValue) return 1;
          return 0;
        } else if (sortDirection === "desc") {
          if (aValue > bValue) return -1;
          if (aValue < bValue) return 1;
          return 0;
        }
      }
      return 0;
    });

    setTableData(sortedData);
  };

  return (
    <>
      <GridContainer cols="1">
        <DynamicBooking />
      </GridContainer>
      <GridContainer cols="1">
        <div className="w-full flex justify-end">
          <Modal
            id="first-modal"
            title="Titre du modal"
            openButtonText="Ouvrir le modal"
            primaryButtonText="Valider"
            secondaryButtonText="Annuler"
            icon={<Plus isFilled={false} />}
            onSubmit={() => console.log("submit")}
          >
            <InputText
              name="fullname"
              label="Nom complet"
              required={true}
              placeholder="John Doe"
            />
            <InputText
              name="email"
              label="Email"
              required={true}
              type="email"
              placeholder="john.doe@mail.com"
            />
            <InputText
              name="password"
              label="Mot de passe"
              required={true}
              type="password"
              placeholder="********"
            />
            <InputText
              name="confirm-password"
              label="Confirmer le mot de passe"
              required={true}
              type="password"
              placeholder="********"
            />
          </Modal>
        </div>
      </GridContainer>
      <GridContainer cols="4">
        <div className="w-full bg-red-500 h-10"></div>
        <div className="w-full bg-yellow-500 h-20"></div>
        <div className="w-full bg-green-500 h-5"></div>
        <div className="w-full bg-red-500 h-10"></div>
        <div className="w-full bg-yellow-500 h-20"></div>
        <div className="w-full bg-green-500 h-5"></div>
      </GridContainer>
      <GridContainer cols="3">
        <div className="w-full bg-red-500 h-10"></div>
        <div className="w-full bg-yellow-500 h-20"></div>
        <div className="w-full bg-green-500 h-5"></div>
      </GridContainer>
      <GridContainer cols="2">
        <div className="w-full bg-red-500 h-10"></div>
        <div className="w-full bg-yellow-500 h-20"></div>
      </GridContainer>
      <GridContainer cols="1">
        <Table headerData={headerData} lastRight={true} onSort={sortData}>
          {tableData.map((data, index) => (
            <TableRow key={index}>
              <TableCell isFirst>{data.product_name}</TableCell>
              <TableCell hiddenOnMobile={true}>{data.color}</TableCell>
              <TableCell hiddenOnMobile={true}>{data.category}</TableCell>
              <TableCell>{data.price} $</TableCell>
              <TableCell>
                <div className="w-full flex justify-end">
                  <button className="text-blue-500">Edit</button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </GridContainer>
    </>
  );
}
