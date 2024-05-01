export default function ListingCard({
  listing,
}: {
  listing: ProductHandMade | ProductSports | ProductGuides;
}) {
  function truncateDescription(description: string) {
    const maxLength = 120;
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    } else {
      return description;
    }
  }

  return (
    <div className="border border-opacity-50 rounded-xl p-4 shadow-sm w-[20rem]">
      <p>{listing.title}</p>
      <small className="italic opacity-75">
        {truncateDescription(listing.description)}
      </small>
    </div>
  );
}
