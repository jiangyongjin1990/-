/**
 * 统一动画控制
 * 处理页面加载、滚动显示、悬停效果等
 */

// 页面加载器 - 优化版
function initPageLoader() {
    // 只在价格页面显示加载器
    if (!window.location.pathname.includes('pricing')) {
        return;
    }
    
    // 创建加载器
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);
    
    // 减少延迟时间
    window.addEventListener('load', () => {
        requestAnimationFrame(() => {
            loader.classList.add('hide');
            setTimeout(() => loader.remove(), 200);
        });
    });
}

// 滚动显示动画 - 优化版
function initScrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal, .feature-item, .plan, .price-card, .benefit-item, .tier-card');
    
    // 使用 IntersectionObserver 提高性能
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 使用 requestAnimationFrame 优化动画性能
                requestAnimationFrame(() => {
                    // 减少延迟时间，最多50ms
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                        entry.target.classList.add('animate-fade-in-up');
                    }, Math.min(index * 30, 150));
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    reveals.forEach(element => observer.observe(element));
}

// 平滑滚动 - 优化版
function initSmoothScroll() {
    // 使用事件委托减少监听器数量
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// 导航栏滚动效果 - 优化版
function initNavbarScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    function updateHeader() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 隐藏/显示导航栏
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    // 使用 requestAnimationFrame 节流
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// 添加悬停效果类 - 优化版
function initHoverEffects() {
    // 延迟加载悬停效果
    requestIdleCallback(() => {
        // 卡片悬停效果
        const cards = document.querySelectorAll('.feature-item, .plan, .price-card, .benefit-item, .tier-card, .testimonial-card');
        cards.forEach(card => {
            card.classList.add('hover-lift');
        });
        
        // 按钮光晕效果
        const buttons = document.querySelectorAll('.button.primary, .buy-button.primary');
        buttons.forEach(button => {
            button.classList.add('glow');
        });
    });
}

// 数字动画 - 优化版
function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (range * progress);
        element.textContent = Math.floor(current).toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// 初始化数字动画
function initNumberAnimations() {
    const numbers = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                animateValue(target, 0, count, 1500);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    numbers.forEach(number => observer.observe(number));
}

// 添加视差效果 - 优化版
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// 初始化所有动画 - 优化版
function initAllAnimations() {
    // 关键动画立即初始化
    initNavbarScroll();
    initSmoothScroll();
    
    // 非关键动画延迟初始化
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            initPageLoader();
            initScrollReveal();
            initHoverEffects();
            initNumberAnimations();
            initParallax();
        });
    } else {
        // 降级方案
        setTimeout(() => {
            initPageLoader();
            initScrollReveal();
            initHoverEffects();
            initNumberAnimations();
            initParallax();
        }, 100);
    }
}

// DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
    initAllAnimations();
}

// 导出函数供其他脚本使用
window.AnimationUtils = {
    animateValue,
    initScrollReveal,
    initSmoothScroll
}; 