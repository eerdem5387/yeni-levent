type EventCategoryPickerProps = {
  categories: { id: string; name: string }[];
  selectedIds?: string[];
};

export function EventCategoryPicker({ categories, selectedIds = [] }: EventCategoryPickerProps) {
  if (categories.length === 0) {
    return <p className="text-sm text-muted">Önce aşağıdan bir kategori oluşturun.</p>;
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-navy">Kategoriler</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <label
            key={category.id}
            className="flex cursor-pointer items-center gap-2 rounded-sm border border-line px-3 py-2 text-sm transition hover:border-navy/30 has-[:checked]:border-navy has-[:checked]:bg-navy/5"
          >
            <input
              type="checkbox"
              name="categoryIds"
              value={category.id}
              defaultChecked={selectedIds.includes(category.id)}
            />
            {category.name}
          </label>
        ))}
      </div>
    </div>
  );
}
