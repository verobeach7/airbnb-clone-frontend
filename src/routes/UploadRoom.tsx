import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

export default function UploadRoom() {
  // 두 가지 방식으로 사용할 수 있음
  // 방법1: useHostOnlyPage()처럼 Hook으로 만들어 사용 가능
  // 방법2: <ProtectedPage>처럼 컴포넌트로 만들어 하위에 children 컴포넌트를 두어 사용하는 방식
  // 방법1은 UploadRoom 전체를 허용할지 말지, 방법2는 전체에 대해서 또는 일부 컴포넌트에 대해서도 허용 여부를 선택할 수 있음
  useHostOnlyPage();
  return (
    <ProtectedPage>
      <h1>upload roommmmmmm</h1>
    </ProtectedPage>
  );
}
