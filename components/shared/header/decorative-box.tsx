interface DecorativeBoxProps {
  name: string;
  price: string;
}

export default function DecorativeBox({ name, price }: DecorativeBoxProps) {
  return (
    <div className="p-4 text-left rounded-md transition hover:bg-gray-50">
      <div className="font-semibold text-black mb-1">{name}</div>
      <div className="text-sm text-gray-500">{price}원</div>
    </div>
  );
}