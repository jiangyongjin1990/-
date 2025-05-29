/**
 * 价格页面JavaScript
 * 处理倒计时、数字动画和交互效果
 */

// 倒计时功能 - 优化版
function initCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;
    
    // 设置结束时间（24小时后）
    const endTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance < 0) {
            countdownEl.textContent = '优惠已结束';
            return;
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownEl.textContent = `限时优惠还剩：${hours}小时${minutes}分${seconds}秒`;
        
        requestAnimationFrame(() => {
            setTimeout(updateCountdown, 1000);
        });
    }
    
    updateCountdown();
}

// 数字动画 - 优化版
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    
    const options = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseInt(target.getAttribute('data-target'));
                const suffix = target.getAttribute('data-suffix') || '';
                
                // 使用 requestAnimationFrame 优化性能
                const startTime = performance.now();
                const duration = 1000; // 减少动画时间
                
                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    const current = targetNumber * progress;
                    target.textContent = Math.floor(current) + suffix;
                    
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                }
                
                requestAnimationFrame(update);
                observer.unobserve(target);
            }
        });
    }, options);
    
    numbers.forEach(number => observer.observe(number));
}

// 浮动条显示控制 - 优化版
function initFloatingBar() {
    const floatingBar = document.querySelector('.floating-bar');
    if (!floatingBar) return;
    
    let scrollTimeout;
    let isShowing = false;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // 清除之前的定时器
        clearTimeout(scrollTimeout);
        
        // 向下滚动超过300px时显示（减少触发距离）
        if (currentScroll > 300 && !isShowing) {
            floatingBar.classList.add('show');
            isShowing = true;
            
            // 5秒后自动隐藏
            scrollTimeout = setTimeout(() => {
                floatingBar.classList.remove('show');
                isShowing = false;
            }, 5000);
        } else if (currentScroll <= 300 && isShowing) {
            floatingBar.classList.remove('show');
            isShowing = false;
        }
    });
}

// 价格卡片点击效果 - 优化版
function initPriceCards() {
    // 使用事件委托
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.buy-button');
        if (!button) return;
        
        e.preventDefault();
        
        // 创建涟漪效果
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => ripple.remove(), 600);
        
        // 模拟购买动作
        const card = button.closest('.price-card');
        if (card) {
            showPurchaseModal(card);
        }
    });
}

// 显示购买弹窗 - 优化版
function showPurchaseModal(card) {
    const title = card.querySelector('h3').textContent;
    const price = card.querySelector('.current-price').textContent;
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'purchase-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>确认购买</h3>
            <p>您选择的是：<strong>${title}</strong></p>
            <p>价格：<strong>${price}</strong></p>
            <div class="modal-actions">
                <button class="confirm-btn">确认支付</button>
                <button class="cancel-btn">取消</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加动画类
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
    
    // 事件处理
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('cancel-btn') || e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        } else if (e.target.classList.contains('confirm-btn')) {
            alert('支付功能暂未开放，敬请期待！');
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// CTA按钮效果 - 优化版
function initCTAButtons() {
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.cta-actions button, .floating-cta');
        if (!button) return;
        
        e.preventDefault();
        
        if (button.textContent.includes('领取脱单礼包')) {
            alert('恭喜您！礼包领取成功，请下载APP查看详情。');
        } else if (button.textContent.includes('预约免费恋爱诊断')) {
            showAppointmentForm();
        } else if (button.textContent.includes('立即抢购')) {
            document.querySelector('.price-cards').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
}

// 显示预约表单
function showAppointmentForm() {
    alert('预约功能即将开放，敬请期待！');
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 添加简化的模态框样式
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .purchase-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .purchase-modal.show {
        opacity: 1;
    }
    
    .modal-content {
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
        max-width: 400px;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .purchase-modal.show .modal-content {
        transform: scale(1);
    }
    
    .modal-content h3 {
        color: #333;
        margin-bottom: 20px;
    }
    
    .modal-content p {
        margin: 15px 0;
        color: #666;
    }
    
    .modal-actions {
        margin-top: 30px;
        display: flex;
        gap: 15px;
        justify-content: center;
    }
    
    .modal-actions button {
        padding: 12px 30px;
        border: none;
        border-radius: 25px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .confirm-btn {
        background: linear-gradient(135deg, #ff6b6b, #ee5a24);
        color: white;
    }
    
    .confirm-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(238, 90, 36, 0.3);
    }
    
    .cancel-btn {
        background: #f0f0f0;
        color: #666;
    }
    
    .cancel-btn:hover {
        background: #e0e0e0;
    }
`;

// 页面加载完成后初始化 - 优化版
document.addEventListener('DOMContentLoaded', function() {
    // 添加模态框样式
    document.head.appendChild(modalStyle);
    
    // 立即执行的功能
    initPriceCards();
    initCTAButtons();
    
    // 延迟执行的功能
    requestIdleCallback(() => {
        initCountdown();
        animateNumbers();
        initFloatingBar();
    }, { timeout: 100 });
});

// 添加加载动画样式
const loadStyle = document.createElement('style');
loadStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadStyle); 