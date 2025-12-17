'use client';

import { useEffect, useRef, useState } from 'react';

interface SceneProps {
    introComplete?: boolean;
}

export default function Scene({ introComplete = false }: SceneProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<HTMLCanvasElement>(null);
    const [visible, setVisible] = useState(false);

    // Simple fade in after intro - immediate
    useEffect(() => {
        if (introComplete) {
            // Use RAF for smoother transition start
            requestAnimationFrame(() => setVisible(true));
        }
    }, [introComplete]);

    // Interactive Stars Background
    useEffect(() => {
        const canvas = starsRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let mouseX = 0;
        let mouseY = 0;
        let targetMouseX = 0;
        let targetMouseY = 0;
        let animationId: number;
        let lastFrameTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;

        interface Star {
            x: number;
            y: number;
            z: number;
            size: number;
            color: string;
            twinkleSpeed: number;
            twinkleOffset: number;
        }

        const stars: Star[] = [];
        const numStars = 60; // Reduced from 80 for better performance
        const colors = [
            'rgba(255, 255, 255, ',
            'rgba(200, 220, 255, ',
        ];

        function initStars() {
            stars.length = 0;
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas!.width,
                    y: Math.random() * canvas!.height,
                    z: Math.random() * 1.2 + 0.3, // Reduced depth range
                    size: Math.random() * 0.8 + 0.3, // Smaller stars
                    color: colors[Math.floor(Math.random() * colors.length)],
                    twinkleSpeed: Math.random() * 0.008 + 0.004, // Slower twinkle
                    twinkleOffset: Math.random() * Math.PI * 2
                });
            }
        }

        function resize() {
            if (!canvas || !ctx) return;
            const dpr = Math.min(window.devicePixelRatio, 2); // Limit DPR for performance
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.scale(dpr, dpr);
            initStars();
        }

        function handleMouseMove(e: MouseEvent) {
            targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        }

        function drawStars(time: number) {
            if (!ctx || !canvas) return;
            const width = window.innerWidth;
            const height = window.innerHeight;

            stars.forEach(star => {
                const parallaxX = mouseX * star.z * 5; // Reduced from 8 for smoother effect
                const parallaxY = mouseY * star.z * 5;

                const x = star.x + parallaxX;
                const y = star.y + parallaxY;

                const wrappedX = ((x % width) + width) % width;
                const wrappedY = ((y % height) + height) % height;

                const twinkle = Math.sin(time * star.twinkleSpeed * 0.001 + star.twinkleOffset) * 0.2 + 0.8;
                const opacity = twinkle * (0.15 + star.z * 0.15);

                ctx.beginPath();
                ctx.arc(wrappedX, wrappedY, star.size * star.z, 0, Math.PI * 2);
                ctx.fillStyle = star.color + opacity + ')';
                ctx.fill();
            });
        }

        function animate(currentTime: number) {
            // Frame throttling
            const deltaTime = currentTime - lastFrameTime;
            if (deltaTime < frameInterval) {
                animationId = requestAnimationFrame(animate);
                return;
            }
            lastFrameTime = currentTime - (deltaTime % frameInterval);

            // Smooth mouse interpolation - reduced for less CPU work
            mouseX += (targetMouseX - mouseX) * 0.05; // Reduced from 0.08
            mouseY += (targetMouseY - mouseY) * 0.05;

            if (!ctx || !canvas) {
                animationId = requestAnimationFrame(animate);
                return;
            }
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            drawStars(currentTime);

            animationId = requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        resize();
        animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Main black hole shader - deferred for smoother loading
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let animationId: number;
        let cleanupFn: (() => void) | null = null;

        // Defer WebGL init slightly for smoother loading screen
        const initTimeout = requestAnimationFrame(() => {
            const gl = canvas.getContext('webgl', {
                alpha: true,
                antialias: false,
                powerPreference: 'high-performance',
            });
            if (!gl) {
                console.error("WebGL not supported");
                return;
            }

            const vsSource = `
                attribute vec2 a_position;
                void main() {
                    gl_Position = vec4(a_position, 0.0, 1.0);
                }
            `;

            // Simplified shader for better performance
            const fsSource = `
            precision mediump float;
            uniform float t;
            uniform vec2 r;
            uniform float scrollOffset;
            
            vec2 myTanh(vec2 x) {
                vec2 ex = exp(x);
                vec2 emx = exp(-x);
                return (ex - emx) / (ex + emx);
            }
            
            void main() {
                vec4 o_bg = vec4(0.0);
                vec4 o_anim = vec4(0.0);

                vec2 centerOffset = vec2(scrollOffset * r.x * 0.3, 0.0);

                // Background Layer
                {
                    vec2 p_img = ((gl_FragCoord.xy - centerOffset) * 2.0 - r) / r.y * mat2(1.0, -1.0, 1.0, 1.0);
                    vec2 l_val = myTanh(p_img * 5.0 + 2.0);
                    l_val = min(l_val, l_val * 3.0);
                    vec2 clamped = clamp(l_val, -2.0, 0.0);
                    float diff_y = clamped.y - l_val.y;
                    float safe_px = abs(p_img.x) < 0.001 ? 0.001 : p_img.x;
                    float term = (0.1 - max(0.01 - dot(p_img, p_img) / 200.0, 0.0) * (diff_y / safe_px))
                                 / abs(length(p_img) - 0.7);
                    o_bg += vec4(term);
                    o_bg *= max(o_bg, vec4(0.0));
                }

                // Animation Layer (simplified - reduced iterations)
                {
                    vec2 p_anim = ((gl_FragCoord.xy - centerOffset) * 2.0 - r) / r.y / 0.7;
                    vec2 d = vec2(-1.0, 1.0);
                    float denom = 0.1 + 5.0 / dot(5.0 * p_anim - d, 5.0 * p_anim - d);
                    vec2 c = p_anim * mat2(1.0, 1.0, d.x / denom, d.y / denom);
                    vec2 v = c;
                    v *= mat2(cos(log(length(v)) + t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0))) * 5.0;
                    vec4 animAccum = vec4(0.0);
                    for (int i = 1; i <= 5; i++) { // Reduced from 6 to 5 iterations for performance
                        float fi = float(i);
                        animAccum += sin(vec4(v.x, v.y, v.y, v.x)) + vec4(1.0);
                        v += 0.7 * sin(vec2(v.y, v.x) * fi + t) / fi + 0.5;
                    }
                    vec4 animTerm = 1.0 - exp(-exp(c.x * vec4(0.6, -0.4, -1.0, 0.0))
                                      / animAccum
                                      / (0.1 + 0.1 * pow(length(sin(v / 0.3) * 0.2 + c * vec2(1.0, 2.0)) - 1.0, 2.0))
                                      / (1.0 + 7.0 * exp(0.3 * c.y - dot(c, c)))
                                      / (0.03 + abs(length(p_anim) - 0.7)) * 0.2);
                    o_anim += animTerm;
                }

                // Blend
                vec4 finalColor = mix(o_bg, o_anim, 0.5) * 1.5;
                finalColor = clamp(finalColor, 0.0, 1.0);
                
                // Color grading
                float lum = (finalColor.r + finalColor.g + finalColor.b) / 3.0;
                
                vec3 cyan = vec3(0.0, 1.0, 1.0);
                vec3 purple = vec3(0.6, 0.2, 1.0);
                vec3 magenta = vec3(1.0, 0.0, 0.8);
                vec3 blue = vec3(0.2, 0.4, 1.0);
                
                float colorShift = sin(t * 0.3) * 0.5 + 0.5;
                
                vec3 innerColor = mix(cyan, vec3(1.0), lum * 0.5);
                vec3 midColor = mix(purple, blue, colorShift);
                vec3 outerColor = mix(magenta, purple, colorShift);
                
                vec3 gradientColor;
                if (lum > 0.6) {
                    gradientColor = innerColor;
                } else if (lum > 0.3) {
                    gradientColor = mix(midColor, innerColor, (lum - 0.3) / 0.3);
                } else {
                    gradientColor = mix(outerColor, midColor, lum / 0.3);
                }
                
                finalColor.rgb = gradientColor * lum * 2.0;
                finalColor = clamp(finalColor, 0.0, 1.0);
                
                gl_FragColor = finalColor;
            }
        `;

            function createShader(type: number, source: string): WebGLShader | null {
                const shader = gl!.createShader(type);
                if (!shader) return null;
                gl!.shaderSource(shader, source);
                gl!.compileShader(shader);
                if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
                    console.error('Shader compile failed:', gl!.getShaderInfoLog(shader));
                    gl!.deleteShader(shader);
                    return null;
                }
                return shader;
            }

            function createProgram(vs: string, fs: string): WebGLProgram | null {
                const vertexShader = createShader(gl!.VERTEX_SHADER, vs);
                const fragmentShader = createShader(gl!.FRAGMENT_SHADER, fs);
                if (!vertexShader || !fragmentShader) return null;

                const program = gl!.createProgram();
                if (!program) return null;
                gl!.attachShader(program, vertexShader);
                gl!.attachShader(program, fragmentShader);
                gl!.linkProgram(program);
                if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
                    console.error('Program failed to link:', gl!.getProgramInfoLog(program));
                    gl!.deleteProgram(program);
                    return null;
                }
                return program;
            }

            const program = createProgram(vsSource, fsSource);
            if (!program) return;
            gl.useProgram(program);

            const positionLocation = gl.getAttribLocation(program, 'a_position');
            const timeLocation = gl.getUniformLocation(program, 't');
            const resolutionLocation = gl.getUniformLocation(program, 'r');
            const scrollLocation = gl.getUniformLocation(program, 'scrollOffset');

            const vertices = new Float32Array([
                -1, -1, 1, -1, -1, 1,
                -1, 1, 1, -1, 1, 1,
            ]);
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

            function resize() {
                if (!canvas || !gl) return;
                const dpr = Math.min(window.devicePixelRatio, 1.25); // Reduced from 1.5 for better performance
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                canvas.style.width = window.innerWidth + 'px';
                canvas.style.height = window.innerHeight + 'px';
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            }
            window.addEventListener('resize', resize, { passive: true });
            resize();

            // Start with correct offset (black hole on right)
            let scrollProgress = 0;
            let targetScrollProgress = 0;

            // Throttled scroll handler
            let scrollTicking = false;
            function handleScroll() {
                if (!scrollTicking) {
                    scrollTicking = true;
                    requestAnimationFrame(() => {
                        const scrollY = window.scrollY;
                        const heroHeight = window.innerHeight;
                        targetScrollProgress = Math.min(scrollY / heroHeight, 1);
                        scrollTicking = false;
                    });
                }
            }
            window.addEventListener('scroll', handleScroll, { passive: true });
            // Initialize to current scroll position immediately
            const initScrollY = window.scrollY;
            const initHeroHeight = window.innerHeight;
            targetScrollProgress = Math.min(initScrollY / initHeroHeight, 1);
            scrollProgress = targetScrollProgress;

            const startTime = performance.now();
            let animationId: number;
            let lastRenderTime = 0;
            const targetFPS = 60;
            const renderInterval = 1000 / targetFPS;

            function render(currentTime: number) {
                // Frame throttling for consistent performance
                const deltaTime = currentTime - lastRenderTime;
                if (deltaTime < renderInterval) {
                    animationId = requestAnimationFrame(render);
                    return;
                }
                lastRenderTime = currentTime - (deltaTime % renderInterval);

                const delta = (currentTime - startTime) / 1000;

                // Smoother scroll interpolation - faster response
                scrollProgress += (targetScrollProgress - scrollProgress) * 0.12; // Increased from 0.08 for snappier feel
                // Black hole on right side (offset 0.7 when at top)
                const offset = 0.7 * (1 - scrollProgress);

                gl!.uniform1f(timeLocation, delta);
                gl!.uniform2f(resolutionLocation, canvas!.width, canvas!.height);
                gl!.uniform1f(scrollLocation, offset);
                gl!.drawArrays(gl!.TRIANGLES, 0, 6);

                animationId = requestAnimationFrame(render);
            }
            render(performance.now());

            // Store cleanup function
            cleanupFn = () => {
                window.removeEventListener('resize', resize);
                window.removeEventListener('scroll', handleScroll);
                cancelAnimationFrame(animationId);
                gl.deleteProgram(program);
                gl.deleteBuffer(buffer);
            };
        }); // End of requestAnimationFrame callback

        return () => {
            cancelAnimationFrame(initTimeout);
            if (cleanupFn) cleanupFn();
        };
    }, []);

    return (
        <>
            {/* Interactive Stars Universe - Bottom Layer */}
            <canvas
                ref={starsRef}
                className="fixed top-0 left-0 w-full h-full -z-20"
                style={{
                    background: '#000',
                    pointerEvents: 'none',
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                }}
            />
            {/* Black Hole Effect - simple opacity fade instead of blur */}
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full -z-10"
                style={{
                    background: 'transparent',
                    pointerEvents: 'none',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)',
                    willChange: 'opacity, transform',
                    transform: 'translate3d(0, 0, 0)',
                }}
            />
        </>
    );
}
