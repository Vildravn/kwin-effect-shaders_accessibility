/**
 *  Please see the original licenses / copyright information in individual shader files.
 *
 *  Copyright (C) 2022  kevinlekiller
 *
 *  This program is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU General Public License
 *  as published by the Free Software Foundation; either version 2
 *  of the License, or (at your option) any later version.
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *  https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 */

// AKA Texture or Source in libretro
uniform sampler2D g_Texture;
// Random number generated with drand48() casted to float.
// Only pixels which have changed since the last draw are processed,
// which means if you're doing noise for example, the noise will only apply to the pixels that have changed.
uniform float g_Random;
// AKA TEX0 or vTexCoord in libretro
// The coordinates of the current texture.
in vec2 g_oTexcoord;
// This is the final color of the pixel.
out vec4 g_FragColor;
// Initially set to the current pixel color, at the end of the program g_FragColor is set to this.
vec4 g_Color;
vec4 g_SourceSize;
uniform vec2 g_TextureSize;

#if DALTONIZE_ENABLED == 1
void shader_daltonize();
#endif

void main() {
    g_Color = texture(g_Texture, g_oTexcoord).rgba;
    g_SourceSize = vec4(g_TextureSize, 1.0 / g_TextureSize);

    for (int shader = 0; shader <= SHADERS; shader++) {
        switch(SHADER_ORDER[shader]) {
            #if DALTONIZE_ENABLED == 1
            case SHADER_DALTONIZE:
                shader_daltonize();
                break;
            #endif
            default:
                break;
        }
    }
    g_FragColor = g_Color;
}
