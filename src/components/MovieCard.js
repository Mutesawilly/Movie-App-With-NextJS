import React from "react";

export default function MovieCard({ movie }) {
	return (
		<div className="relative aspect-[1/1.5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ease-in-out bg-white border border-gray-100 group my-6 flex-shrink-0 w-[280px] sm:w-[320px]">
			<div className="relative w-full h-full">
				<img
					src={movie.Poster.replace("http://", "https://")}
					alt={movie.Title}
					width={320}
					height={480}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					loading="lazy"
				/>

				<div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />

				<div className="absolute bottom-0 left-0 right-0 p-5 space-y-1">
					<h2 className="text-xl sm:text-2xl font-semibold text-white drop-shadow-md line-clamp-2">
						{movie.Title}
					</h2>
					<div className="flex justify-between">
						<div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full absolute bottom-5 right-4 shadow-sm">
							<span className="text-xs sm:text-sm font-medium text-gray-800">
								{movie.Type}
							</span>
						</div>
						<p className="text-sm sm:text-base text-gray-200 font-medium">
							{movie.Year}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
