import Container from "@/components/ui/Container";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <Container>
      <UserButton afterSignOutUrl="/" showName />;
    </Container>
  );
}
