"use client";

import { motion } from "framer-motion";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

type ParticlesProps = {
	quantity?: number;
	staticity?: number;
	ease?: number | number[];
	refresh?: boolean;
	className?: string;
};

export function Particles({
	className,
	quantity = 30,
	staticity = 50,
	ease = 50,
	refresh = false,
}: ParticlesProps) {
	const circles = useMemo(() => {
		return Array.from({ length: quantity }, (_, i) => {
			const size = Math.floor(Math.random() * 3 + 1);
			const duration = (Math.random() * (30 - 5) + 5) / (size * 0.5);
			const delay = Math.random() * (duration * 0.5);

			return {
				id: i,
				size: size,
				startX: Math.random() * 100,
				startY: Math.random() * 100,
				endX: Math.random() * 100,
				endY: Math.random() * 100,
				duration: duration,
				delay: delay,
			};
		});
	}, [quantity, refresh]);

	return (
		<div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
			{circles.map((circle) => (
				<motion.div
					key={circle.id}
					className="particle-circle"
					initial={{
						x: `${circle.startX}vw`,
						y: `${circle.startY}vh`,
						opacity: 0,
					}}
					animate={{
						x: `${circle.endX}vw`,
						y: `${circle.endY}vh`,
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: circle.duration,
						delay: circle.delay,
						repeat: Infinity,
						repeatType: "loop",
						ease: "linear",
					}}
					style={{
						width: `${circle.size}px`,
						height: `${circle.size}px`,
					}}
				/>
			))}
		</div>
	);
}