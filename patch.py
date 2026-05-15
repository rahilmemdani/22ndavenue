with open("src/components/Spotlight/Services.module.css", "r") as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if line.startswith("/* ===== SERVICE CARD — Premium Editorial ===== */"):
        new_lines.append("@media (min-width: 768px) {\n")
        new_lines.append("  .snapSlide {\n")
        new_lines.append("    flex: 0 0 calc(50% - 1rem);\n")
        new_lines.append("    padding: 0;\n")
        new_lines.append("    min-width: 0;\n")
        new_lines.append("  }\n\n")
        new_lines.append("  .servicesCarousel {\n")
        new_lines.append("    justify-content: flex-start;\n")
        new_lines.append("    gap: 2rem;\n")
        new_lines.append("    padding: 1.5rem 5% 1rem;\n")
        new_lines.append("  }\n")
        new_lines.append("}\n\n")
        new_lines.append(line)
    else:
        new_lines.append(line)

with open("src/components/Spotlight/Services.module.css", "w") as f:
    f.writelines(new_lines)
