"use client";
import { cities } from "@/cities";
import IconSearch from "@/components/icons/Search";
import CardItem from "@/components/utils/CardItem";
import CardSkeleton from "@/components/utils/CardSkeleton";
import { selectedSub } from "@/components/utils/FilterModal";
import { CategoryWName, categories } from "@/constants/categories";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  Input,
} from "@nextui-org/react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

type Result = {
  data: Product[];
  lastVisible: any;
};

export default function Main() {
  const searchParams = useSearchParams();
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    string | undefined
  >(searchParams.get("sub") || undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    searchParams.get("cat") || undefined
  );
  const [selectedLocationId, setSelectedLocationId] = useState<
    string | undefined
  >(searchParams.get("locId") || undefined);
  const [subcategoriesFiltered, setSubcategoryFiltered] = useState<
    selectedSub[]
  >([]);
  const [min, setMin] = useState<string | undefined>(
    searchParams.get("min") || undefined
  );
  const [max, setMax] = useState<string | undefined>(
    searchParams.get("max") || undefined
  );
  const [keyword, setKeyword] = useState<string>(
    searchParams.get("keyword") || ""
  );
  const [allProducts, setAllProducts] = useState<Product[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [lastVisible, setLastVisible] = useState<string>();
  const [endResult, setEndResult] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    let allSubs: any = [];
    if (!selectedCategory) {
      categories.forEach((c) => {
        c.subcategories.forEach((sub) =>
          allSubs.push({ id: sub.id, name: sub.name })
        );
      });
      setSubcategoryFiltered(allSubs);
    } else {
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
        setSelectedSubcategory("");
      } else {
        setSubcategoryFiltered(allSubs);
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchProducts(
      selectedSubcategory,
      selectedCategory,
      selectedLocationId,
      keyword,
      min,
      max,
      lastVisible
    );
  }, []);

  const searchParamsMemo = useMemo(
    () => ({
      selectedSubcategory,
      selectedCategory,
      selectedLocationId,
      keyword,
      min,
      max,
      lastVisible,
    }),
    [
      selectedSubcategory,
      selectedCategory,
      selectedLocationId,
      keyword,
      min,
      max,
      lastVisible,
    ]
  );

  const fetchProducts = useCallback(
    async (
      selectedSubcategory: string | undefined,
      selectedCategory: string | undefined,
      selectedLocationId: string | undefined,
      keyword: string,
      min: string | undefined = "",
      max: string | undefined = "",
      lastVisible: string | undefined
    ) => {
      if (!selectedCategory && !selectedSubcategory) return;
      setLoading(true);
      let query = "?";
      if (selectedSubcategory) query += `&sub=${selectedSubcategory}`;
      if (selectedCategory) query += `&cat=${selectedCategory}`;
      if (selectedLocationId) query += `&locId=${selectedLocationId}`;
      if (keyword.length > 0) query += `&keyword=${keyword}`;
      if (min) query += `&min=${min}`;
      if (max) query += `&max=${max}`;
      (async () => {
        const res = await fetch(
          `/api/listings/search${query}&lastVisible=${lastVisible}`,
          { cache: "no-cache" }
        );
        const response = (await res.json()) as Result | undefined;
        if (response && response.data.length < 12) setEndResult(true);
        setAllProducts((prev) => {
          if (prev && response) {
            return [...prev, ...response?.data];
          } else {
            return response?.data;
          }
        });
        query = `?&cat=${selectedCategory || ""}&sub=${
          selectedSubcategory || ""
        }&locId=${selectedLocationId || ""}&keyword=${keyword || ""}&min=${
          min || ""
        }&max=${max || ""}`;
        setLastVisible(response?.lastVisible);
        router.push(`/listings${query}`);
        setLoading(false);
      })();
    },
    [searchParamsMemo]
  );

  const handleSearch = () => {
    setEndResult(false);
    setLastVisible(undefined);
    setAllProducts([]);
    fetchProducts(
      selectedSubcategory,
      selectedCategory,
      selectedLocationId,
      keyword,
      min,
      max,
      undefined
    );
  };

  return (
    <div className="flex flex-1 flex-grow min-h-[90vh]">
      <div className="max-w-[100rem] flex justify-center flex-col flex-1 w-full px-2 xs:px-2 sm:px-3 py-4">
        <div className="flex flex-row items-stretch flex-1 justify-center gap-3">
          <div className="flex w-[20%]">
            <Card className="flex flex-1 h-fit py-3">
              <CardBody className="space-y-4">
                <div className="space-y-2 px-2">
                  <p className="text-medium font-bold opacity-80">Categories</p>
                  <div className="flex flex-row flex-wrap gap-1.5">
                    {CategoryWName.map((c, i) => (
                      <button
                        onClick={() => {
                          setEndResult(false);
                          setSelectedCategory(c.id);
                          setSelectedSubcategory("");
                          setAllProducts([]);
                          setLastVisible(undefined);
                          fetchProducts(
                            "",
                            c.id,
                            selectedLocationId,
                            keyword,
                            min,
                            max,
                            undefined
                          );
                        }}
                        key={`${c.name}-${i}`}
                        className={`px-1.5 py-0.5 transition-all border-2 text-bl border-sky-600 text-sky-600 rounded-lg ${
                          selectedCategory === c.id && "!text-white bg-sky-600"
                        }`}
                      >
                        <small>{c.name}</small>
                      </button>
                    ))}
                  </div>
                </div>
                {selectedCategory !== "66207ab5b27e1a42a69a6517" && (
                  <React.Fragment>
                    <div className="space-y-2 px-2">
                      <p className="text-medium font-bold opacity-80">Tags</p>
                      <div className="flex flex-row flex-wrap gap-1.5 min-h-[1rem]">
                        {subcategoriesFiltered.map((c, index) => (
                          <>
                            {c.id !== "66207abd90b31d11aa680131" && (
                              <button
                                onClick={() => {
                                  setEndResult(false);
                                  setSelectedSubcategory(c.id);
                                  setAllProducts([]);
                                  setLastVisible(undefined);
                                  fetchProducts(
                                    c.id,
                                    "",
                                    selectedLocationId,
                                    keyword,
                                    min,
                                    max,
                                    undefined
                                  );
                                }}
                                key={`${c.name}-${index}`}
                                className={`px-1.5 py-0.5 transition-all border-2 text-bl border-sky-600 text-sky-600 rounded-lg ${
                                  selectedSubcategory === c.id &&
                                  "!text-white bg-sky-600"
                                }`}
                              >
                                <small>{c.name}</small>
                              </button>
                            )}
                          </>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                )}
                <div className="space-y-2 px-2">
                  <p className="text-medium font-bold opacity-80">Location</p>
                  <Autocomplete
                    defaultItems={cities}
                    placeholder="Location.."
                    size="md"
                    value={selectedLocationId}
                    defaultSelectedKey={selectedLocationId}
                    className=""
                    onSelectionChange={(key) => {
                      if (key) {
                        setSelectedLocationId(key.toString() || undefined);
                      } else {
                        setSelectedLocationId(undefined);
                      }
                    }}
                  >
                    {(city) => (
                      <AutocompleteItem key={city.id}>
                        {city.city}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>
                <div className="space-y-2 px-2">
                  <p className="text-medium font-bold opacity-80">Price</p>
                  <div className="flex flex-row items-center justify-center gap-4">
                    <Input
                      placeholder="-"
                      value={min}
                      size="sm"
                      label="min"
                      labelPlacement="outside-left"
                      className="w-auto"
                      type="number"
                      onChange={(e) => setMin(e.target.value)}
                    />
                    <p className="mx-2">-</p>
                    <Input
                      placeholder="-"
                      value={max}
                      size="sm"
                      label="max"
                      labelPlacement="outside-left"
                      className="w-auto"
                      type="number"
                      onChange={(e) => setMax(e.target.value)}
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
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                    endContent={
                      <div
                        onClick={handleSearch}
                        className="p-1.5 bg-transparent hover:bg-black/10 rounded-full"
                      >
                        <IconSearch className="opacity-75 text-2xl cursor-pointer" />
                      </div>
                    }
                  />
                  <h1 className="text-center">Results</h1>
                  <div className="flex flex-1 justify-center">
                    <div className="flex w-fit flex-col items-center justify-start">
                      <div className="flex w-fit h-fit flex-col items-start space-y-8">
                        {loading ? (
                          <div className="grid grid-cols-4 gap-8">
                            {Array.from({ length: 8 }).map((_, i) => (
                              <React.Fragment key={i}>
                                <CardSkeleton />
                              </React.Fragment>
                            ))}
                          </div>
                        ) : (
                          <>
                            {allProducts && (
                              <div className="grid grid-cols-4 gap-8">
                                {allProducts.map((product, i) => (
                                  <React.Fragment key={i}>
                                    <CardItem data={product} />
                                  </React.Fragment>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                        {allProducts &&
                          allProducts.length !== 0 &&
                          endResult === false && (
                            <Button
                              onClick={() => {
                                setEndResult(false);
                                fetchProducts(
                                  selectedSubcategory,
                                  selectedCategory,
                                  selectedLocationId,
                                  keyword,
                                  min,
                                  max,
                                  lastVisible
                                );
                              }}
                            >
                              Load More
                            </Button>
                          )}
                      </div>
                      {allProducts && allProducts.length === 0 && endResult && (
                        <p className="my-4 italic opacity-80">
                          No Offers Found.
                        </p>
                      )}
                      {allProducts && allProducts.length > 0 && endResult && (
                        <p className="my-4 italic opacity-80 flex self-stretch h-full text-center place-self-stretch items-end justify-center">
                          End Result.
                        </p>
                      )}
                      {!selectedCategory && !selectedSubcategory && (
                        <p className="my-4 italic opacity-80 flex self-stretch h-full items-center justify-self-center">
                          Please select a category
                        </p>
                      )}
                    </div>
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
