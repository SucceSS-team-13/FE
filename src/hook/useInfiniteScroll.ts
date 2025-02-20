import { useInfiniteQuery, QueryFunction } from "@tanstack/react-query";
import { useRef, useCallback } from "react";
import { InfiniteData } from "@tanstack/react-query";

export const useInfiniteScroll = <T, TQueryKey extends readonly unknown[]>({
  queryKey,
  queryFn,
  getNextPageParam,
}: UseInfiniteScrollProps<T, TQueryKey>) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<T, Error, InfiniteData<T>, TQueryKey, number>({
      queryKey: queryKey,
      queryFn: queryFn as QueryFunction<T, TQueryKey, number>,
      getNextPageParam,
      initialPageParam: 1,
    });

  const observer = useRef<IntersectionObserver | null>(null); // 마지막 요소인지 확인하기 위한 ref
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return; // 데이터를 가져오는 중이라면 return
      if (observer.current) observer.current.disconnect(); // 이미 존재하는 observer가 있다면 제거
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          // 마지막 요소가 보이고 데이터가 더 있다면
          fetchNextPage(); // 다음 페이지 데이터 가져오기
        }
      });
      if (node) observer.current.observe(node); // 마지막 요소가 보이면 observer 추가
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage] // 의존성 배열
  );

  return { data, lastElementRef, isFetchingNextPage }; // 데이터, 마지막 요소 ref, 데이터를 가져오는 중인지 여부 반환
};

interface UseInfiniteScrollProps<T, TQueryKey extends readonly unknown[]> {
  queryKey: TQueryKey;
  queryFn: QueryFunction<T, TQueryKey, number>;
  getNextPageParam: (lastPage: T, allPages: T[]) => number | undefined;
}
