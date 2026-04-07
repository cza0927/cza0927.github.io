from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


SUPPORTED_SUFFIXES = {".png", ".jpg", ".jpeg"}


def resize_image(input_path: Path, output_path: Path, target_width: int = 300) -> None:
    if input_path.suffix.lower() not in SUPPORTED_SUFFIXES:
        raise ValueError(f"Unsupported file type: {input_path.suffix}")

    with Image.open(input_path) as image:
        original_width, original_height = image.size
        if original_width == 0:
            raise ValueError("Image width cannot be 0")

        target_height = round(original_height * target_width / original_width)
        resized = image.resize((target_width, target_height), Image.Resampling.LANCZOS)

        if resized.mode in {"RGBA", "P"} and output_path.suffix.lower() in {".jpg", ".jpeg"}:
            resized = resized.convert("RGB")

        output_path.parent.mkdir(parents=True, exist_ok=True)
        resized.save(output_path)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Resize a PNG/JPG image to a target width while keeping aspect ratio."
    )
    parser.add_argument("input", type=Path, help="Input image path")
    parser.add_argument("output", type=Path, help="Output image path")
    parser.add_argument(
        "--width",
        type=int,
        default=300,
        help="Target width in pixels, default is 300",
    )
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    resize_image(args.input, args.output, args.width)


if __name__ == "__main__":
    main()