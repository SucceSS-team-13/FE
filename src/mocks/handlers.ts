import { http, HttpResponse } from "msw";
import { CHAT_RESPONSES } from "../data/chatResponses";
import { chatRooms } from "../data/chatRoomList";
import { PAGE_SIZE } from "../constants/pagiNationConstants";

interface SurveyRequest {
  ageGroup: string;
  location: string;
  personalityEnergy: string;
  personalityJudgement: string;
  hobbies: Hobby[];
}

interface ChatRequest {
  text: string;
}

const delay = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

export const handlers = [
  http.patch("/api/members/profile/update/:memberId", async ({ request, params }) => {
    const {memberId} = params;
    const body = await request.json() as SurveyRequest;

    return HttpResponse.json({
      isSuccess: true,
      code: 200,
      message: 'ok',
      result: {
        memberId: memberId,
        nickname: "윈터",
        age: body.ageGroup, 
        location: body.location,
        personalityType_energy: body.personalityEnergy,
        personalityType_judgement: body.personalityJudgement,
        hobbies: body.hobbies,
        message: null,
      },
    });
  }),
  http.get("/api/members/profile/:memberId", () => {
    return HttpResponse.json({
      result: {
        message: `안녕하세요, 홍길동 님! 성향 분석 결과를 알려드릴게요.

        홍길동 님은 조용한 환경에서 깊이 있는 생각을 하는 것을 선호하시는 내향적인 성향을 가지고 계시네요. 특히 논리적인 사고를 바탕으로 결정을 내리시는 특징이 있습니다.

        독서와 영화 감상을 즐기시는 점으로 미루어 보아, 풍부한 상상력과 지적 호기심을 가지고 계신 것 같아요. 이러한 취미 활동은 홍길동 님의 내면을 더욱 풍요롭게 만들어주고 있을 거예요.

        앞으로도 자신만의 페이스를 유지하면서 차근차근 성장해 나가시면 좋을 것 같아요. 혹시 고민이 있으시다면 언제든 저에게 이야기해 주세요.
      `,
      },
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
  http.post(`/user/chat`, async ({ request }) => {
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
        location: [
          "서울특별시 구로구 연동로 320",
        ]
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
  http.get(`/api/searchChatRoomList`, async ({ request }) => {
    await delay(3000);
    const url = new URL(request.url);
    const searchText = url.searchParams.get("search")?.toLowerCase() || "";

    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const filteredChatRooms = chatRooms.filter(
      (room) => room.title.toLowerCase().includes(searchText) // 검색어가 없을 경우 모든 채팅방 리스트 반환
    );

    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const paginatedSearchChatRooms = filteredChatRooms.slice(start, end);
    const nextPage = end < filteredChatRooms.length ? page + 1 : undefined;

    return HttpResponse.json({
      result: paginatedSearchChatRooms,
      nextPage,
      totalItems: filteredChatRooms.length,
      totalPages: Math.ceil(filteredChatRooms.length / PAGE_SIZE),
    });
  }),
  http.get(`/api/chat/room/:chatRoomId`, async ({ params, request }) => {
    const { chatRoomId } = params;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);

    if (chatRoomId === "0") {
      return HttpResponse.json({
        result: {
          content: [],
        },
      });
    } else {
      return HttpResponse.json({
        result: {
          content: [
            {
              id: Date.now() + 1,
              sender: "lumi",
              text: `많이 힘드셨겠어요... 아래의 장소로 가서 기분전환을 해보세요! ${page}-1`,
              location: [
                "서울특별시 구로구 연동로 320",
                "서울특별시 용산구 청파로47길 100",
                "서울특별시 성북구 보문로34다길 2",
              ],
            },
            {
              id: Date.now() + 2,
              sender: "user",
              text: "많이 힘드셨겠어요... 아래의 장소로 가서 기분전환을 해보세요!",
            },
            {
              id: Date.now() + 3,
              sender: "lumi",
              text: `많이 힘드셨겠어요... 아래의 장소로 가서 기분전환을 해보세요! ${page}-2`,
              location: ["서울특별시 구로구 연동로 320"],
            },
            {
              id: Date.now() + 4,
              sender: "user",
              text: "많이 힘드셨겠어요... 아래의 장소로 가서 기분전환을 해보세요!",
            },
            {
              id: Date.now() + 5,
              sender: "lumi",
              text: `많이 힘드셨겠어요... 아래의 장소로 가서 기분전환을 해보세요! ${page}-3`,
              location: ["서울특별시 구로구 연동로 320"],
            },
            {
              id: Date.now() + 6,
              sender: "user",
              text: "많이 힘드셨겠어요... 아래의 장소로 가서 기분전환을 해보세요!",
            },
            {
              id: Date.now() + 7,
              sender: "lumi",
              text: `많이 힘드셨겠어요... 아래의 장소로 가서 기분전환을 해보세요! ${page}-4`,
              location: ["서울특별시 구로구 연동로 320"],
            },
            {
              id: Date.now() + 8,
              sender: "user",
              text: "많이 힘드셨겠어요... 아래의 장소로 가서 기분전환을 해보세요!",
            },
            {
              id: Date.now() + 9,
              sender: "lumi",
              text: `많이 힘드셨겠어요... 아래의 장소로 가서 기분전환을 해보세요! ${page}-5`,
              location: ["서울특별시 구로구 연동로 320"],
            },
            {
              id: Date.now() + 10,
              sender: "user",
              text: "많이 힘드셨겠어요... 아래의 장소로 가서 기분전환을 해보세요!",
            },
          ],
        },
      });
    }
  }),
];
