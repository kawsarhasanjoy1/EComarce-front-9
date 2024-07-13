"use client";
import BForm from "@/component/Forms/BForm";
import FileUpload from "@/component/Forms/FileUpload";
import { Input } from "@/component/Forms/Input";
import BSelect from "@/component/Forms/BSelect";
import TextArea from "@/component/Forms/TextArea";
import { Minerals, foodCategories, vitamins } from "@/constanc/constant";
import useHostImage from "@/hook/hostImage/hostImage";
import { FieldValues } from "react-hook-form";
import { useCreateProductMutation } from "@/redux/api/productApi";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hook";
import { DefaultProductValue } from "@/DeafualtValue/global";

const AddProduct = () => {
  const user = useAppSelector((store) => store.auth.user);
  const [createProduct] = useCreateProductMutation();
  const HandleToSubmit = async (values: FieldValues) => {
    const res = await useHostImage(values?.image);
    if (res.id) {
      values.price = Number(values.price);
      values.nutrients.vitamins = values.nutrients.vitamins.map(
        (item: any) => item.value
      );
      values.nutrients.minerals = values.nutrients.minerals.map(
        (item: any) => item.value
      );
      values.category = values.category.value;
      values.stock = values.stock;
      values.image = res.display_url;
      values.discountPrice = Number(values.discountPrice);
      values.isFalse = Number(values?.discountPrice === 0) ? true : false;
      values.userId = user?.id;
      try {
        const result: any = await createProduct(values).unwrap();
        if (result?.success) {
          toast.success("Product created successful");
        }
      } catch (err: any) {
        toast.error(err?.message);
      }
    }
  };
  return (
    <BForm
      onSubmit={HandleToSubmit}
      // resolver={zodResolver(productSchema)}
      defaultValues={DefaultProductValue}
    >
      <div className=" grid md:grid-cols-2 grid-cols-1 gap-10">
        <div className=" space-y-3 bg-white shadow-md rounded-lg p-6">
          <div className=" space-y-2">
            <label className=" font-semibold" htmlFor="Product Name">
              Product Name
            </label>
            <Input label="Name" name="name" edit=" rounded-md" type="text" />
          </div>
          <div className=" space-y-2">
            <BSelect
              options={foodCategories}
              edit=""
              name="category"
              label="Category"
              multi={false}
            />
          </div>
          <div className=" space-y-2">
            <BSelect
              name="nutrients.vitamins"
              label="Vitamins"
              edit=""
              options={vitamins}
              multi={true}
            />
          </div>
          <div className=" space-y-2">
            <BSelect
              name="nutrients.minerals"
              label="Minerals"
              edit=""
              options={Minerals}
              multi={true}
            />
          </div>
          <div className=" space-y-2">
            <label className=" font-semibold" htmlFor="Price">
              Price
            </label>
            <Input label="Price" name="price" edit="" type="number" />
          </div>

          <div className=" space-y-2">
            <label className=" font-semibold" htmlFor="Discount Price">
              Discount Price
            </label>
            <Input
              label="DiscountPrice"
              name="discountPrice"
              edit=""
              type="number"
            />
          </div>
        </div>
        <div className=" flex flex-col  bg-white  p-6 space-y-7 shadow-md rounded-lg">
          <div className=" space-y-2">
            <label className=" font-semibold" htmlFor="Stock">
              Stock
            </label>
            <Input label="Stock" name="stock" edit="" type="number" />
          </div>
          <div className=" space-y-2">
            <label className=" font-semibold" htmlFor="Discount End Date">
              Discount End Date
            </label>
            <Input
              label="DiscountEndDate"
              name="discountEndDate"
              edit=" "
              type="date"
            />
          </div>
          <div>
            <FileUpload type="file" label="Image" name="image" edit="" />
          </div>
          <div>
            <TextArea
              edit=""
              label="Description"
              name="description"
              type="text"
            />
          </div>
        </div>
      </div>
      <button
        className={"uppercase font-bold px-10 bg-black text-white py-2 mt-8"}
      >
        Submit
      </button>
    </BForm>
  );
};

export default AddProduct;
