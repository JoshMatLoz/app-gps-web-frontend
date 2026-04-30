CREATE TABLE IF NOT EXISTS reportes(
	id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
	id_detalle_gps_unidad UUID REFERENCES detalles_gps_unidades(id) NOT NULL,
	numero_reporte NUMERIC UNIQUE NOT NULL, --numero de reporte que se genera en la mesa de servicio
	fecha_creacion TIMESTAMPTZ DEFAULT NOW(),--fecha de apertura del registro será automatico
	fecha_cierre TIMESTAMPTZ, --fecha de cierre de reporte, será automatico
	nombre_validador TEXT, --nombre de la persona de centro de mando gps que valida la unidad
	reporte_cerrado BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS detalles_gps_unidades(
	id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
	id_modulo_gps UUID REFERENCES modulos_gps(id) NOT NULL,
	id_unidad UUID REFERENCES unidades(id) NOT NULL,
	fecha_instalacion TIMESTAMPTZ DEFAULT NOW(),
	fecha_retiro TIMESTAMPTZ
);

CREATE TYPE estatus_unidad AS ENUM ('ACTIVA', 'BAJA');

CREATE TABLE IF NOT EXISTS unidades(
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  id_tipo UUID REFERENCES modelos_vehiculos(id) NOT NULL,
  economico TEXT UNIQUE NOT NULL, 
  estatus estatus_unidad DEFAULT 'ACTIVA' 
);

CREATE TYPE estatus_gps AS ENUM ('ACTIVO', 'DESHUESE');

CREATE TABLE IF NOT EXISTS modulos_gps(
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  id_modelo_gps UUID NOT NULL REFERENCES modelos_gps(id),
  serie TEXT UNIQUE,
  imei TEXT UNIQUE NOT NULL,
  linea TEXT UNIQUE,
  imei_linea TEXT UNIQUE,
  estatus estatus_gps DEFAULT 'ACTIVO'
);


CREATE TYPE tipo AS ENUM ('TRANSPORTE', 'DISTRIBUCION', 'STAFF', 'DIRECTIVOS', 'CAJA SECA');

CREATE TABLE IF NOT EXISTS modelos_vehiculos(
	id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
	nombre_modelo TEXT UNIQUE NOT NULL,
	tipo_unidad tipo NOT NULL 
);

CREATE TABLE IF NOT EXISTS modelos_gps(
	id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
	nombre_modelo TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios(
	id UUID REFERENCES auth.users(id) NOT NULL PRIMARY KEY,
	nombre TEXT,
	correo TEXT
);

CREATE OR REPLACE FUNCTION establecer_fecha_cierre()
 RETURNS TRIGGER AS $$
 BEGIN
	-- Si el reporte se está marcando como cerrado, le ponemos la fecha actual
    IF NEW.reporte_cerrado = TRUE AND OLD.reporte_cerrado = FALSE THEN
        NEW.fecha_cierre = NOW();
    -- Opcional: Si desmarcas la casilla por error (lo reabres), quitamos la fecha
    ELSIF NEW.reporte_cerrado = FALSE AND OLD.reporte_cerrado = TRUE THEN
        NEW.fecha_cierre = NULL;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_establecer_fecha_cierre
BEFORE UPDATE ON reportes
FOR EACH ROW
EXECUTE FUNCTION establecer_fecha_cierre();

ALTER TABLE usuarios ALTER COLUMN nombre SET NOT NULL;

CREATE OR REPLACE FUNCTION crear_perfil_usuario()
RETURNS TRIGGER AS $$
BEGIN
	INSERT INTO public.usuarios(id,nombre,correo)
	VALUES(
		NEW.id,
		NEW.raw_user_meta_data->>'nombre',
		NEW.email
	);
	RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trigger_crear_perfil_usuario
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION crear_perfil_usuario();

-- modelos_gps
CREATE POLICY "Acceso total para usuarios autenticados" ON modelos_gps
FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

-- modulos_gps
CREATE POLICY "Acceso total para usuarios autenticados" ON modulos_gps
FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

-- modelos_vehiculos
CREATE POLICY "Acceso total para usuarios autenticados" ON modelos_vehiculos
FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

-- unidades
CREATE POLICY "Acceso total para usuarios autenticados" ON unidades
FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

-- detalles_gps_unidades
CREATE POLICY "Acceso total para usuarios autenticados" ON detalles_gps_unidades
FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

-- reportes
CREATE POLICY "Acceso total para usuarios autenticados" ON reportes
FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

CREATE TYPE tipo_reporte AS ENUM ('INSTALACION', 'REPARACION', 'DESINSTALACION');

ALTER TABLE reportes ADD COLUMN tipo_reporte tipo_reporte NOT NULL;