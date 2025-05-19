/**
 * 红娘暖暖网站主JavaScript文件
 * @description 提供网站交互功能和动画效果
 */

// 当页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 页面滚动显示元素动画
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, observerOptions);
    
    // 应用于特色功能和红娘服务部分
    document.querySelectorAll('.feature-item, .plan').forEach(el => {
        el.classList.add('fade-in');
        appearOnScroll.observe(el);
    });
    
    // 鼠标悬停动画效果增强
    const animateElements = document.querySelectorAll('.feature-item, .plan, .profile-card');
    
    animateElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.12)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // 添加视差滚动效果
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // 主横幅视差效果
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundPosition = `center ${scrollY * 0.5}px`;
        }
        
        // 红娘服务区域视差效果
        const matchmakerSection = document.querySelector('.matchmaker');
        if (matchmakerSection) {
            matchmakerSection.style.backgroundPosition = `center ${-scrollY * 0.2}px`;
        }
    });
    
    // 添加鼠标跟随效果
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        document.querySelectorAll('.hero:before, .matchmaker:after').forEach(element => {
            const moveX = (mouseX - window.innerWidth / 2) * 0.05;
            const moveY = (mouseY - window.innerHeight / 2) * 0.05;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // 加载时为用户卡片添加动画
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('loaded');
        }, 100 * index);
    });
    
    // 按钮波纹动画效果
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}); 