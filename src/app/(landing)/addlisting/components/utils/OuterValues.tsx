type Props = {
  userId: string;
  categoryId: string | null;
  subCategoryId: string | null;
  location: string | null;
};

export default function OuterValues({
  userId,
  categoryId,
  subCategoryId,
  location,
}: Props) {
  return (
    <>
      {/* outer values begin */}
      <input name="userId" value={userId} className="absolute hidden" />
      {categoryId && (
        <input
          name="categoryId"
          value={categoryId}
          className="absolute hidden"
        />
      )}
      {subCategoryId && (
        <input
          name="subCategoryId"
          value={subCategoryId}
          className="absolute hidden"
        />
      )}
      {location && (
        <input name="location" value={location} className="absolute hidden" />
      )}
      {/* outer values end */}
    </>
  );
}
