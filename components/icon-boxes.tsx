import {
  Phone,
  MapPin,
  FileText,
  UserSquare,
} from 'lucide-react';
import { Card, CardContent } from './ui/card';

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
          {/* 왼쪽 첫 번째 항목 */}
          <div className='space-y-1'>
            <div className='flex items-center gap-2 text-base font-semibold text-gray-800'>
              <Phone size={18} />
              전화 문의
            </div>
            <div className='text-sm text-gray-600'>02-1234-5678</div>
          </div>

          {/* 오른쪽 첫 번째 항목 */}
          

          {/* 왼쪽 두 번째 항목 */}
        
<div className='space-y-1'>
            <div className='flex items-center gap-2 text-base font-semibold text-gray-800'>
              <MapPin size={18} />
              병원 위치
            </div>
            <div className='text-sm text-gray-600 leading-snug'>
              06626 서울특별시 서초구 강남대로 355<br />
              삼성화재 서초사옥 15층
            </div>
          </div>
          <div className='space-y-1'>
            <div className='flex items-center gap-2 text-base font-semibold text-gray-800'>
              <FileText size={18} />
              사업자등록번호
            </div>
            <div className='text-sm text-gray-600'>217-94-26654</div>
          </div>
          {/* 오른쪽 두 번째 항목 */}
          <div className='space-y-1'>
            <div className='flex items-center gap-2 text-base font-semibold text-gray-800'>
              <UserSquare size={18} />
              대표자명
            </div>
            <div className='text-sm text-gray-600'>황재윤 (강남토스안과의원)</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconBoxes;
