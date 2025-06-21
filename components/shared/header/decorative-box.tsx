'use client';

import React from 'react';

interface DecorativeBoxProps {
  name: string;
  price: string;
}

export default function DecorativeBox({ name, price }: DecorativeBoxProps) {
  return (
    <div
      className="p-4 transition-colors duration-200 hover:bg-gray-100 rounded-md"
    >
      <h3 className="text-sm font-semibold text-gray-900 mb-1">{name}</h3>
      <p className="text-sm text-gray-500">{price}원</p>
    </div>
  );
}
