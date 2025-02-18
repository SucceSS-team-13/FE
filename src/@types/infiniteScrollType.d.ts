interface UseInfiniteScrollProps<T> {
  queryKey: string;
  queryFn: ({ pageParam }: { pageParam?: number }) => Promise<T>;
  getNextPageParam: (lastPage: T, pages: T[]) => number | undefined;
}
