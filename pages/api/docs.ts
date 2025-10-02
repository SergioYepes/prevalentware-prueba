
import { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '../../lib/requireAuth';

// OpenAPI JSON básico para la documentación de la API
const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'API de Gestión Financiera',
    version: '1.0.0',
    description: 'Documentación de la API para la prueba técnica Fullstack.'
  },
  paths: {
    '/api/users': {
      get: {
        summary: 'Obtener todos los usuarios',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Lista de usuarios',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/User' } } } }
          },
          401: { description: 'No autenticado' },
          403: { description: 'No autorizado' }
        }
      },
      post: {
        summary: 'Crear usuario',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } }
        },
        responses: {
          201: { description: 'Usuario creado' },
          400: { description: 'Error de validación' },
          401: { description: 'No autenticado' },
          403: { description: 'No autorizado' }
        }
      }
    },
    '/api/movements': {
      get: {
        summary: 'Obtener movimientos',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Lista de movimientos' },
          401: { description: 'No autenticado' }
        }
      },
      post: {
        summary: 'Crear movimiento',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Movement' } } }
        },
        responses: {
          201: { description: 'Movimiento creado' },
          400: { description: 'Error de validación' },
          401: { description: 'No autenticado' },
          403: { description: 'No autorizado' }
        }
      }
    },
    '/api/report': {
      get: {
        summary: 'Obtener reporte financiero',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Reporte financiero' },
          401: { description: 'No autenticado' },
          403: { description: 'No autorizado' }
        }
      }
    }
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
          role: { type: 'string', enum: ['USER', 'ADMIN'] }
        }
      },
      Movement: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          concept: { type: 'string' },
          amount: { type: 'number' },
          date: { type: 'string', format: 'date-time' },
          userId: { type: 'string' }
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await requireAuth(req, res);
  if (!session) return;
  res.status(200).json(openApiSpec);
}
