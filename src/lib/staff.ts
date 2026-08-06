export function hasStaffPhoto(photoUrl: string | null | undefined) {
  const url = photoUrl?.trim();
  if (!url) return false;
  return url.startsWith("http") || url.startsWith("/uploads/");
}

export const publishedStaffWithPhotoWhere = {
  published: true,
  OR: [
    { photoUrl: { startsWith: "http" } },
    { photoUrl: { startsWith: "/uploads/" } },
  ],
} as const;

export const staffWithoutPhotoWhere = {
  OR: [
    { photoUrl: null },
    { photoUrl: "" },
    {
      AND: [
        { NOT: { photoUrl: { startsWith: "http" } } },
        { NOT: { photoUrl: { startsWith: "/uploads/" } } },
      ],
    },
  ],
} as const;
