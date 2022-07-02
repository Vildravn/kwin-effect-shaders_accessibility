#if DALTONIZE_ENABLED == 1
void shader_daltonize() {
    float L = (17.8824 * g_Color.r) + (43.5161 * g_Color.g) + (4.11935 * g_Color.b);
    float M = (3.45565 * g_Color.r) + (27.1554 * g_Color.g) + (3.86714 * g_Color.b);
    float S = (0.0299566 * g_Color.r) + (0.184309 * g_Color.g) + (1.46709 * g_Color.b);

    float l,m,s;
    if (DALTONIZE_MODE == 0) //Protanopia
	{
		l = 0.0 * L + 2.02344 * M + -2.52581 * S;
		m = 0.0 * L + 1.0 * M + 0.0 * S;
		s = 0.0 * L + 0.0 * M + 1.0 * S;
	}
	
	if (DALTONIZE_MODE == 1) //Deuteranopia
	{
		l = 1.0 * L + 0.0 * M + 0.0 * S;
    	m = 0.494207 * L + 0.0 * M + 1.24827 * S;
    	s = 0.0 * L + 0.0 * M + 1.0 * S;
	}
	
	if (DALTONIZE_MODE == 2) //Tritanopia
	{
		l = 1.0 * L + 0.0 * M + 0.0 * S;
    	m = 0.0 * L + 1.0 * M + 0.0 * S;
    	s = -0.395913 * L + 0.801109 * M + 0.0 * S;
	}

    vec4 error;
	error.r = (0.0809444479 * l) + (-0.130504409 * m) + (0.116721066 * s);
	error.g = (-0.0102485335 * l) + (0.0540193266 * m) + (-0.113614708 * s);
	error.b = (-0.000365296938 * l) + (-0.00412161469 * m) + (0.693511405 * s);
	error.a = 1.0;

	vec4 diff = g_Color - error;

	vec4 correction;
	correction.r = 0.0;
	correction.g =  (diff.r * 0.7) + (diff.g * 1.0);
	correction.b =  (diff.r * 0.7) + (diff.b * 1.0);
	correction = g_Color + correction;
	correction.a = g_Color.a * DALTONIZE_INTENSITY;

    g_Color = correction;
}
#endif // DALTONIZE_ENABLED