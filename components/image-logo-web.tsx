import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ImageLogoWebProps {
    variant?: 'big' | 'small' | 'mascot';
    className?: string;
    imageClassName?: string;
    textClassName?: string;
}

export function ImageLogoWeb({
    variant = 'big',
    className,
    imageClassName,
    textClassName
}: ImageLogoWebProps) {
    if (variant === 'mascot') {
        return (
            <div className={cn("relative inline-block", className)}>
                <Image
                    src="/logo/ora-head-logo.png"
                    alt="Ora Mascot"
                    width={100}
                    height={100}
                    className={cn("w-full h-auto object-contain drop-shadow-lg", imageClassName)}
                />
            </div>
        );
    }

    if (variant === 'small') {
        return (
            <div className={cn("relative w-14 h-14 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden flex-shrink-0", className)}>
                <Image
                    src="/logo/ora-head-logo.png"
                    alt="Langora Logo"
                    width={40}
                    height={40}
                    className={cn("w-16 h-16 object-contain drop-shadow-md transform hover:scale-110 transition-transform duration-200", imageClassName)}
                />
            </div>
        );
    }

    // default: big
    return (
        <div className={cn("flex items-center gap-3", className)}>
            <div className={cn("relative w-14 h-14 border-2 rounded-xl border-primary/20 bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0", imageClassName)}>
                <Image
                    src="/logo/ora-head-logo.png"
                    alt="Langora Logo"
                    width={40}
                    height={40}
                    className="w-16 h-16 object-contain drop-shadow-md transform hover:scale-110 transition-transform duration-200"
                />
            </div>
            <div>
                <h1 className={cn("text-lg font-black text-primary leading-none tracking-tight text-heading uppercase", textClassName)}>
                    Lang<span className=" text-primary">ora</span>
                </h1>
            </div>
        </div>
    );
}

export default ImageLogoWeb;
