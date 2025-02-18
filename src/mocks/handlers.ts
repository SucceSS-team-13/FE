import { http, HttpResponse } from "msw";
import { CHAT_RESPONSES } from "../data/chatResponses";
import { chatRooms } from "../data/chatRoomList";
import { PAGE_SIZE } from "../constants/pagiNationConstants";

interface ChatRequest {
  text: string;
}

const delay = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

export const handlers = [
  http.post("/api/survey", () => {
    return HttpResponse.json({
      result: `안녕하세요, 홍길동 님! 성향 분석 결과를 알려드릴게요.

        홍길동 님은 조용한 환경에서 깊이 있는 생각을 하는 것을 선호하시는 내향적인 성향을 가지고 계시네요. 특히 논리적인 사고를 바탕으로 결정을 내리시는 특징이 있습니다.

        독서와 영화 감상을 즐기시는 점으로 미루어 보아, 풍부한 상상력과 지적 호기심을 가지고 계신 것 같아요. 이러한 취미 활동은 홍길동 님의 내면을 더욱 풍요롭게 만들어주고 있을 거예요.

        앞으로도 자신만의 페이스를 유지하면서 차근차근 성장해 나가시면 좋을 것 같아요. 혹시 고민이 있으시다면 언제든 저에게 이야기해 주세요.
      `,
    });
  }),
  // 채팅 내용 가져오기
  http.get(`/api/chatting/:chatRoomId`, () => {
    return HttpResponse.json({
      result: {
        chatting: [],
      },
    });
  }),
  // 채팅 전송
  http.post(`/api/chatting/:chatRoomId`, async ({ request }) => {
    await delay(2000);
    const requestData = (await request.json()) as ChatRequest;
    const userMessage = requestData.text;

    if (CHAT_RESPONSES[userMessage]) {
      return HttpResponse.json({
        result: {
          id: Date.now() + 2,
          text: CHAT_RESPONSES[userMessage],
        },
      });
    }

    return HttpResponse.json({
      result: {
        id: Date.now() + 2,
        text: "많이 힘드셨겠어요... 아래의 장소로 가서 기분전환을 해보세요!",
        location: "서울특별시 구로구 연동로 320",
      },
    });
  }),
  http.get(`/api/chatRoomList`, async ({ request }) => {
    await delay(3000);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const paginatedChatRooms = chatRooms.slice(start, end);

    const nextPage = end < chatRooms.length ? page + 1 : undefined;

    return HttpResponse.json({
      result: paginatedChatRooms,
      nextPage,
      totalItems: chatRooms.length,
      totalPages: Math.ceil(chatRooms.length / PAGE_SIZE),
    });
  }),
];
