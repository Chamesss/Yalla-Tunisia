"use client";
import { cities } from "@/cities";
import IconSearch from "@/components/icons/Search";
import CardItem from "@/components/utils/CardItem";
import CardSkeleton from "@/components/utils/CardSkeleton";
import { usePathname } from "next/navigation";
import { selectedSub } from "@/components/utils/FilterModal";
import {
  CategoriesIds,
  CategoryWName,
  SubcategoryIds,
  categories,
} from "@/constants/categories";
import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  Input,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useQueryChangeDetector from "@/hooks/useQueryChangeDetector";

export default function Main() {
  const searchParams = useSearchParams();
  const category = searchParams.get("cat") || "";
  const keyword = searchParams.get("keyword") || "";
  const subCategory = searchParams.get("sub") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [subcategoriesFiltered, setSubcategoryFiltered] = useState<
    selectedSub[]
  >([]);

  const [handmades, setHandmades] = useState<ProductHandMade[]>();
  const [sports, setSports] = useState<ProductSports[]>();
  const [guides, setGuides] = useState<ProductGuides[]>();
  const [allProducts, setAllProducts] = useState<Product[]>();

  const [loading, setLoading] = useState<boolean>(true);

  const pathname = usePathname();

  useEffect(() => {
    if (selectedCategory === "") {
      setSelectedSubcategory("");
      let allSubs: any = [];
      categories.forEach((c) => {
        c.subcategories.forEach((sub) =>
          allSubs.push({ id: sub.id, name: sub.name })
        );
      });
      setSubcategoryFiltered(allSubs);
    } else {
      let allSubs: any = [];
      const index = categories.findIndex((c) => c.id === selectedCategory);
      categories[index].subcategories.forEach((sub) =>
        allSubs.push({ id: sub.id, name: sub.name })
      );
      if (selectedCategory === "66207ab5b27e1a42a69a6517") {
        const value = {
          id: categories[2].subcategories[0].id,
          name: categories[2].subcategories[0].name,
        };
        setSubcategoryFiltered([value]);
        setSelectedSubcategory("66207abd90b31d11aa680131");
      } else {
        setSubcategoryFiltered(allSubs);
        setSelectedSubcategory("");
      }
    }
  }, [selectedCategory]);

  const query = useQueryChangeDetector();

  useEffect(() => {
    setLoading(true);
    let query = "?";
    if (subCategory && SubcategoryIds.includes(subCategory)) {
      query += `sub=${subCategory}`;
      if (keyword.length > 0) {
        query += `&keyword=${keyword}`;
      }
    } else if (category && CategoriesIds.includes(category)) {
      query += `cat=${category}`;
      if (keyword.length > 0) {
        query += `&keyword=${keyword}`;
      }
    } else if (keyword.length > 0) {
      query += `keyword=${keyword}`;
    } else {
      query += "random=true";
    }

    if (min) {
      query += `&min=${min}`;
    }
    if (max) {
      query += `&max=${max}`;
    }
    (async () => {
      const res = await fetch(`/api/listings/search${query}`, {
        cache: "no-cache",
      });
      const response = (await res.json()) as Product[] | undefined;
      setAllProducts(response);
      console.log("all products === ", response);
      setLoading(false);
    })();
  }, [query]);

  useEffect(() => {
    console.log("Query parameters:", query);
    // Perform actions based on the query parameters
  }, [query]);

  if (SubcategoryIds.includes(subCategory)) {
    if (keyword.length > 0) {
      //fetch products by subcategory and keyword
    } else {
      //fetch products by subcategory
    }
  } else {
    if (CategoriesIds.includes(category)) {
      if (keyword.length > 0) {
        //fetch products by category and keyword
      } else {
        //fetch products by category
      }
    } else {
      if (keyword.length > 0) {
        //fetch products by keyword
      } else {
        //fetch Random
      }
    }
  }

  return (
    <div className="flex flex-1 flex-grow min-h-[90vh]">
      <div className="max-w-[100rem] flex justify-center flex-col flex-1 w-full px-2 xs:px-2 sm:px-3 py-4">
        <div className="flex flex-row items-stretch flex-1 justify-center gap-3">
          <div className="flex w-[20%]">
            <Card className="flex flex-1 py-3">
              <CardBody>
                <div className="space-y-3 px-2">
                  <p className="text-medium font-semibold">Category</p>
                  <div className="flex flex-row flex-wrap gap-2 px-2">
                    {CategoryWName.map((c, i) => (
                      <button
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === c.id ? "" : c.id
                          )
                        }
                        key={`${c.name}-${i}`}
                        className={`px-2 py-1 transition-all border-2 text-bl border-sky-600 text-sky-600 rounded-lg ${
                          selectedCategory === c.id && "!text-white bg-sky-600"
                        }`}
                      >
                        <small>{c.name}</small>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 mt-4 px-2">
                  <p className="text-medium font-semibold">Subcategory</p>
                  <div className="flex flex-row flex-wrap gap-2 px-2 min-h-[1rem]">
                    {subcategoriesFiltered.map((c, index) => (
                      <button
                        onClick={() =>
                          setSelectedSubcategory(
                            selectedSubcategory === c.id ? "" : c.id
                          )
                        }
                        key={`${c.name}-${index}`}
                        className={`px-2 py-1 transition-all border-2 text-bl border-sky-600 text-sky-600 rounded-lg ${
                          selectedSubcategory === c.id &&
                          "!text-white bg-sky-600"
                        }`}
                      >
                        <small>{c.name}</small>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 mt-4 px-2">
                  <p className="text-medium font-semibold">Location</p>
                  <Autocomplete
                    defaultItems={cities}
                    placeholder="Location.."
                    size="md"
                    className="px-4"
                    onSelectionChange={(key) =>
                      setSelectedLocationId(key.toString())
                    }
                  >
                    {(city) => (
                      <AutocompleteItem key={city.id}>
                        {city.city}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>
                <div className="space-y-3 mt-4 px-2">
                  <p className="text-medium font-semibold">Price</p>
                  <div className="flex flex-row items-center justify-center gap-4 px-10">
                    <Input
                      size="sm"
                      label="min"
                      labelPlacement="outside-left"
                      className="min-w-[5rem]"
                    />
                    <p className="mx-2">-</p>
                    <Input
                      size="sm"
                      label="max"
                      labelPlacement="outside-left"
                      className="min-w-[5rem]"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="flex flex-1">
            <Card className="flex flex-1">
              <CardBody className="flex flex-1">
                <div className="flex flex-col px-2 py-2 h-full gap-4">
                  <Input
                    className="w-full"
                    placeholder="Search"
                    defaultValue={keyword}
                    endContent={
                      <div className="p-1.5 bg-transparent hover:bg-black/10 rounded-full">
                        <IconSearch className="opacity-75 text-2xl cursor-pointer" />
                      </div>
                    }
                  />
                  <h1 className="px-2">Results</h1>
                  <div className="flex flex-1 justify-center">
                    {loading ? (
                      <div className="grid grid-cols-4 gap-8">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <React.Fragment key={i}>
                            <CardSkeleton />
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-0 items-start">
                        <div className="grid grid-cols-5 gap-8">
                          {allProducts &&
                            allProducts.map((product, i) => (
                              <React.Fragment key={i}>
                                <CardItem data={product} />
                              </React.Fragment>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// useEffect(() => {
//   (async () => {
//     const handmadesDocs = await fetch(`/api/admin/getalllistings/Handmades`, {
//       cache: "no-cache",
//     });
//     const handmades = (await handmadesDocs.json()) as ProductHandMade[];
//     console.log("handmades === ", handmades);
//     setHandmades(handmades);
//     const sportsDoc = await fetch(`/api/admin/getalllistings/Sports`, {
//       cache: "no-cache",
//     });
//     const sports = (await sportsDoc.json()) as ProductSports[];
//     setSports(sports);
//     console.log("sports === ", sports);
//     const guidesDoc = await fetch(`/api/admin/getalllistings/Guides`, {
//       cache: "no-cache",
//     });
//     const guides = (await guidesDoc.json()) as ProductGuides[];
//     console.log("guides === ", guides);
//     setGuides(guides);
//     const allProducts = [...handmades, ...sports, ...guides];
//     setAllProducts(allProducts);
//     setLoading(false);
//   })();
// }, []);
