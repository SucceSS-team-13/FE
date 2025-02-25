import { useInfiniteQuery, QueryFunction } from "@tanstack/react-query";
import { useRef, useCallback, useState, useEffect } from "react";
import { InfiniteData } from "@tanstack/react-query";

export const useInfiniteScroll = <T, TQueryKey extends readonly unknown[]>({
  queryKey,
  queryFn,
  getNextPageParam,
  throttleMs = 3000,
}: UseInfiniteScrollProps<T, TQueryKey> & { throttleMs?: number }) => {
  const [isThrottled, setIsThrottled] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery<T, Error, InfiniteData<T>, TQueryKey, number>({
      queryKey: queryKey,
      queryFn: queryFn as QueryFunction<T, TQueryKey, number>,
      getNextPageParam,
      initialPageParam: 1,
    });

  const observer = useRef<IntersectionObserver | null>(null); // 마지막 요소인지 확인하기 위한 ref
  const throttleTimer = useRef<NodeJS.Timeout | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage || isFetching || isThrottled) return; // // 데이터를 가져오는 중이거나 throttle 중이면 observer 설정하지 않음
      if (observer.current) observer.current.disconnect(); // 이미 존재하는 observer가 있다면 제거
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isThrottled &&
          !isFetchingNextPage &&
          !isFetching
        ) {
          setIsThrottled(true);
          // 마지막 요소가 보이고 데이터가 더 있다면
          fetchNextPage(); // 다음 페이지 데이터 가져오기
          // throttle 타이머 설정
          if (throttleTimer.current) {
            clearTimeout(throttleTimer.current);
          }

          throttleTimer.current = setTimeout(() => {
            setIsThrottled(false);
          }, throttleMs);
        }
      });
      if (node) observer.current.observe(node); // 마지막 요소가 보이면 observer 추가
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage, isFetching, isThrottled] // 의존성 배열
  );

  // cleanup
  const cleanup = useCallback(() => {
    if (throttleTimer.current) {
      clearTimeout(throttleTimer.current);
    }
    if (observer.current) {
      observer.current.disconnect();
    }
  }, []);

  // unmount시 cleanup
  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return { data, lastElementRef, isFetchingNextPage, isThrottled }; // 데이터, 마지막 요소 ref, 데이터를 가져오는 중인지 여부 반환
};

interface UseInfiniteScrollProps<T, TQueryKey extends readonly unknown[]> {
  queryKey: TQueryKey;
  queryFn: QueryFunction<T, TQueryKey, number>;
  getNextPageParam: (lastPage: T, allPages: T[]) => number | undefined;
}
