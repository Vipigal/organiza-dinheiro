import Container from "@/components/Container";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <Container>
      <UserButton afterSignOutUrl="/" showName />;
    </Container>
  );
}
