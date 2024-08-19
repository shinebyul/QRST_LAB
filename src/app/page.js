"use client"

import { useState, useEffect } from 'react';
import MobileMenu from './component/navigation/mobileMenu';
import Footer from '/public/icons/footer.svg'
import Screen1 from './component/about/screen1';
import Screen2 from './component/about/screen2';
import Screen3 from './component/about/screen3';
import Screen4 from './component/about/screen4';

export default function Home() {
  const [page, setPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [fadeInUp, setFadeInUp] = useState(false);

  // 모바일용 터치 위치 추적
  let startY = 0;

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();

      if (!isScrolling) {
        setIsScrolling(true);

        if (event.deltaY > 0) {
          setPage((prevPage) => Math.min(prevPage + 1, lastPage));
        } else if (event.deltaY < 0) {
          setPage((prevPage) => Math.max(prevPage - 1, 0));
        }

        setTimeout(() => {
          setIsScrolling(false);
        }, 1500); 
      }
    };

    const box = document.getElementsByClassName('box');
    const lastPage = box.length - 1;

    const handleTouchStart = (event) => {
      startY = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      if (!isScrolling) {
        const currentY = event.touches[0].clientY;
        const diffY = startY - currentY;

        if (diffY > 50) {
          setIsScrolling(true);
          setPage((prevPage) => Math.min(prevPage + 1, lastPage));
        } else if (diffY < -50) {
          setIsScrolling(true);
          setPage((prevPage) => Math.max(prevPage - 1, 0));
        }

        setTimeout(() => {
          setIsScrolling(false);
        }, 1500);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isScrolling]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowDown') {
        setPage((prevPage) => Math.min(prevPage + 1, lastPage));
      } else if (event.key === 'ArrowUp') {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
      }
    };

    const box = document.getElementsByClassName('box');
    const lastPage = box.length - 1;

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const wrap = document.getElementById('wrap');
    wrap.style.top = page * -100 + 'vh';
  }, [page]);

  useEffect(() => {
    if (page === 1) {
      setTimeout(() => {
        setFadeInUp(true);
      }, 1000);
    } else {
      setTimeout(() => {
        setFadeInUp(false);
      }, 300);
    }
  }, [page]);

  return (
    <div className="container">
      <div id="wrap" className="wrap">
        <div className="box screen1">
          <Screen1 />
        </div>
        <div className="box screen2">
          <div className={`draggdisable center ${fadeInUp ? "fade-in-up" : "fade-out"}`}>
            <Screen2 />
          </div>
        </div>
        <div className="box screen3">
          <Screen3 />
        </div>
        <div className="box screen4">
          <Screen4 />
        </div>
      </div>
      {/* <div className="footer"><Footer /></div> */}
    </div>
  );
}
