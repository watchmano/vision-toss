const sampleData = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: '123456',
      role: 'admin',
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: '123456',
      role: 'user',
    },
  ],
  products : [
    {
      name: '투데이라섹',
      slug: 'today-lasik',
      category: '시력 교정 수술',
      description: '근시, 난시 엑스머레이저 교정수술',
      images: [
        '/images/surgery/two-day-lasik-1.png',
        
      ],
      price: 2800000,
      brand: '강남토스안과',
      rating: 4.5,
      numReviews: 12,
      stock: 9999,
      isFeatured: true,
      banner: '/images/surgery/two-day-lasik-1.png',
    },
    {
      name: '스마일라식',
      slug: 'smile-lasik',
      category: '시력 교정 수술',
      description: '근시, 난시 펨토레이저 교정수술',
      images: [
        '/images/surgery/smile-lasik-1.png'
      ],
      price: 2500000,
      brand: '강남토스안과',
      rating: 4.4,
      numReviews: 9,
      stock: 9999,
      isFeatured: true,
      banner: '/images/surgery/smile-lasik-1.png',
    },
    {
      name: '안내렌즈삽입술',
      slug: 'icl-lens-insertion',
      category: '렌즈삽입술',
      description: '근시, 난시 안내렌즈삽입 교정수술',
      images: [
        '/images/surgery/icl-1.png'
      ],
      price: 6000000,
      brand: '강남토스안과',
      rating: 4.8,
      numReviews: 20,
      stock: 9999,
      isFeatured: true,
      banner: '/images/surgery/icl-1.png'
    },
    {
      name: '크로스링킹',
      slug: 'cross-linking',
      category: '각막 치료 수술',
      description: '원추각막 치료 수술',
      images: [
        '/images/surgery/crosslinking-1.png'
      ],
      price: 2500000,
      brand: '강남토스안과',
      rating: 4.1,
      numReviews: 6,
      stock: 9999,
      isFeatured: false,
      banner: '/images/surgery/crosslinking-1.png',
    },
    {
      name: '백내장 수술',
      slug: 'cataract-surgery',
      category: '백내장 수술',
      description: '일반 백내장 수술',
      images: [
        '/images/surgery/cataract-1.png'
      ],
      price: 1350000,
      brand: '강남토스안과',
      rating: 4.3,
      numReviews: 10,
      stock: 9999,
      isFeatured: false,
      banner: '/images/surgery/cataract-1.png'
    },
    {
      name: '테크니스 퓨어씨',
      slug: 'technis-purec',
      category: '다초점 인공수정체',
      description: '원거리, 중간거리 생활형 근거리까지 선명한 인공수정체',
      images: [
        '/images/surgery/technis-pure-1.png',
      ],
      price: 3000000,
      brand: 'Technis',
      rating: 4.6,
      numReviews: 15,
      stock: 9999,
      isFeatured: true,
      banner: '/images/surgery/technis-pure-1.png',
    }
  ]
  
};

export default sampleData;
