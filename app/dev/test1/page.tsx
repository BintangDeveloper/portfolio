import Dropdown from "@/components/ui/dropdown";

const items = [
  { label: 'Your profile', href: '#' },
  { label: 'Your projects', href: '#' },
  { label: 'Help', href: '#' },
  { label: 'Settings', href: '#' },
  { label: 'Sign Out', href: '#' },
];


export default function test1() {
  return (
    <Dropdown direction="up" items={items} />
  );
}